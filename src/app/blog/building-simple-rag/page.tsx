import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "Building Simple RAG — Diken Shah",
  description:
    "A practical guide to building a Retrieval-Augmented Generation pipeline from scratch — embedding documents, storing vectors, and querying with LLMs.",
};

const articleHTML = `
<h2>What is RAG?</h2>
<p>Retrieval-Augmented Generation (RAG) is a pattern that combines the power of Large Language Models (LLMs) with external knowledge retrieval. Instead of relying solely on what the model was trained on, RAG fetches relevant documents from a knowledge base and feeds them to the LLM as context — producing answers that are accurate, current, and grounded in your own data.</p>
<p>Think of it this way: an LLM without RAG is like answering questions from memory. An LLM with RAG is like answering questions with a reference book open in front of you.</p>

<h2>Why RAG Matters</h2>
<p>LLMs are powerful, but they have some well-known limitations:</p>
<ul>
  <li><strong>Hallucination</strong> — they sometimes generate plausible-sounding but incorrect information.</li>
  <li><strong>Stale knowledge</strong> — they only know what was in their training data, which has a cutoff date.</li>
  <li><strong>No access to your data</strong> — they can't answer questions about your private documents, codebases, or internal knowledge.</li>
</ul>
<p>RAG solves all three by grounding the model's responses in real, retrieved data.</p>

<h2>The RAG Pipeline — Step by Step</h2>
<p>A simple RAG pipeline has three core stages:</p>

<h3>1. Document Ingestion &amp; Chunking</h3>
<p>First, you take your source documents (PDFs, text files, web pages, Notion docs — whatever you have) and break them into smaller, meaningful chunks. Why? Because LLMs have context window limits, and passing an entire 200-page PDF isn't practical.</p>
<pre><code>from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = splitter.split_documents(documents)</code></pre>
<p>The key decisions here are <strong>chunk size</strong> and <strong>overlap</strong>. Too small and you lose context; too large and you waste tokens. I typically start with 500 characters and 50 overlap, then adjust based on results.</p>

<h3>2. Embedding &amp; Vector Storage</h3>
<p>Each chunk gets converted into a vector embedding — a numerical representation that captures its semantic meaning. Similar content produces similar vectors, which is how retrieval works later.</p>
<pre><code>from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)</code></pre>
<p>I usually start with <strong>ChromaDB</strong> for local development (zero setup) and move to <strong>Pinecone</strong> for production (managed, scalable). HuggingFace embeddings are a great free alternative to OpenAI's.</p>

<h3>3. Retrieval &amp; Generation</h3>
<p>When a user asks a question, you:</p>
<ol>
  <li>Embed the question into the same vector space</li>
  <li>Find the most similar document chunks (nearest neighbors)</li>
  <li>Pass those chunks + the question to the LLM</li>
  <li>The LLM generates an answer grounded in the retrieved context</li>
</ol>
<pre><code>from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(model="gpt-4")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3})
)

answer = qa_chain.run("What is the refund policy?")</code></pre>

<h2>Tips from Production</h2>
<p>After building several RAG systems, here are some things I've learned:</p>
<ul>
  <li><strong>Chunk quality matters more than quantity.</strong> Garbage in, garbage out. Clean your documents before chunking.</li>
  <li><strong>Experiment with retrieval count (k).</strong> Retrieving too many chunks adds noise; too few misses relevant info. Start with k=3.</li>
  <li><strong>Use metadata filtering.</strong> Tag chunks with source, date, or category — then filter at retrieval time. Way more accurate.</li>
  <li><strong>Evaluate your pipeline.</strong> Use frameworks like RAGAS to measure retrieval precision, answer relevance, and faithfulness.</li>
  <li><strong>Consider hybrid search.</strong> Combine semantic (vector) search with keyword (BM25) search for better recall.</li>
</ul>

<h2>What's Next?</h2>
<p>This is the simplest RAG setup — and it's surprisingly effective for many use cases. From here, you can explore:</p>
<ul>
  <li><strong>Multi-step RAG</strong> — where the agent decides if it needs more context and retrieves again.</li>
  <li><strong>Agentic RAG</strong> — where tools and RAG work together inside a LangGraph workflow.</li>
  <li><strong>RAG with re-ranking</strong> — using a cross-encoder to re-score retrieved chunks for higher precision.</li>
</ul>
<p>I'll cover these in upcoming posts. If you're building something with RAG and want to chat, feel free to <a href="/#contact-section">reach out</a>.</p>
`;

export default function BuildingSimpleRAG() {
  return (
    <BlogLayout
      category="Agentic AI"
      date="February 16, 2026"
      readTime="8 min read"
      title="Building Simple RAG"
      subtitle="A practical guide to building a Retrieval-Augmented Generation pipeline from scratch — embedding documents, storing vectors, and querying with LLMs for accurate, grounded answers."
    >
      <div dangerouslySetInnerHTML={{ __html: articleHTML }} />
    </BlogLayout>
  );
}
