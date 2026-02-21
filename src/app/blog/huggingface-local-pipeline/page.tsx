import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "Download & Run HuggingFace Models Locally — Diken Shah",
  description:
    "No API keys, no cloud dependency, fully offline — download any HuggingFace model and run inference using the Transformers pipeline in a few lines of Python.",
};

const articleHTML = `
<h2>Why Run Models Locally?</h2>
<p>Cloud APIs are convenient, but there are solid reasons to run models on your own machine:</p>
<ul>
  <li><strong>Privacy</strong> — your data never leaves your device. Critical for sensitive documents, healthcare, or legal use cases.</li>
  <li><strong>Cost</strong> — no per-token charges. Once downloaded, you can run inference as many times as you want for free.</li>
  <li><strong>Offline access</strong> — works without internet after the initial download.</li>
  <li><strong>Customization</strong> — full control over model configuration, quantization, and fine-tuning.</li>
</ul>
<p>HuggingFace's <code>transformers</code> library makes this remarkably simple with its <code>pipeline</code> API.</p>

<h2>Prerequisites</h2>
<p>Before starting, make sure you have Python 3.8+ installed. Then install the required packages:</p>
<pre><code>pip install transformers torch</code></pre>
<p>If you're on a Mac with Apple Silicon, PyTorch will automatically use the MPS (Metal Performance Shaders) backend for GPU acceleration. On Linux/Windows with an NVIDIA GPU, install the CUDA version of PyTorch for best performance.</p>
<p>Optionally, install <code>accelerate</code> for better memory management with large models:</p>
<pre><code>pip install accelerate</code></pre>

<h2>Step 1: Pick a Model</h2>
<p>Head to <a href="https://huggingface.co/models" target="_blank" rel="noopener noreferrer">huggingface.co/models</a> and browse. For this guide, we'll use a few practical examples:</p>
<ul>
  <li><strong>Text generation:</strong> <code>microsoft/DialoGPT-medium</code> or <code>TinyLlama/TinyLlama-1.1B-Chat-v1.0</code></li>
  <li><strong>Sentiment analysis:</strong> <code>distilbert-base-uncased-finetuned-sst-2-english</code></li>
  <li><strong>Summarization:</strong> <code>facebook/bart-large-cnn</code></li>
  <li><strong>Embeddings:</strong> <code>sentence-transformers/all-MiniLM-L6-v2</code></li>
</ul>

<h2>Step 2: Download &amp; Run with Pipeline</h2>
<p>The <code>pipeline</code> function is the easiest way to use any model. It handles tokenization, inference, and post-processing in one call.</p>

<h3>Text Classification (Sentiment Analysis)</h3>
<pre><code>from transformers import pipeline

# First run downloads the model (~260MB)
classifier = pipeline("sentiment-analysis",
                       model="distilbert-base-uncased-finetuned-sst-2-english")

result = classifier("I love building AI applications!")
print(result)
# [{'label': 'POSITIVE', 'score': 0.9998}]</code></pre>

<h3>Text Generation</h3>
<pre><code>from transformers import pipeline

generator = pipeline("text-generation",
                     model="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
                     torch_dtype="auto")

messages = [
    {"role": "system", "content": "You are a helpful AI assistant."},
    {"role": "user", "content": "Explain RAG in 2 sentences."}
]

output = generator(messages, max_new_tokens=100, do_sample=True, temperature=0.7)
print(output[0]["generated_text"][-1]["content"])</code></pre>

<h3>Summarization</h3>
<pre><code>from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

article = """
Retrieval-Augmented Generation (RAG) is a technique that combines
information retrieval with text generation. It works by first searching
a knowledge base for relevant documents, then passing those documents
as context to a language model.
"""

summary = summarizer(article, max_length=50, min_length=20)
print(summary[0]["summary_text"])</code></pre>

<h2>Step 3: Save Models to a Custom Directory</h2>
<pre><code>from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_name = "distilbert-base-uncased-finetuned-sst-2-english"
save_path = "./models/sentiment"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

tokenizer.save_pretrained(save_path)
model.save_pretrained(save_path)
print(f"Model saved to {save_path}")</code></pre>

<p>Later, load it from the local path — no internet required:</p>
<pre><code>classifier = pipeline("sentiment-analysis", model="./models/sentiment")
result = classifier("Running models locally is amazing!")</code></pre>

<h2>Step 4: Using GPU Acceleration</h2>
<pre><code>import torch
device = 0 if torch.cuda.is_available() else ("mps" if torch.backends.mps.is_available() else -1)
classifier = pipeline("sentiment-analysis",
                       model="distilbert-base-uncased-finetuned-sst-2-english",
                       device=device)</code></pre>

<h2>Practical Tips</h2>
<ul>
  <li><strong>Start small.</strong> Models like <code>distilbert</code> and <code>TinyLlama-1.1B</code> run fine on a laptop with 8GB RAM.</li>
  <li><strong>Use quantization for large models.</strong> 4-bit quantization via <code>bitsandbytes</code> can cut memory usage by 75%.</li>
  <li><strong>Check model size before downloading.</strong> A 7B parameter model in fp16 is ~14GB.</li>
  <li><strong>Use <code>pipeline</code> for quick tasks</strong>, and <code>AutoModel</code> + <code>AutoTokenizer</code> when you need more control.</li>
  <li><strong>Batch your inputs</strong> for better throughput.</li>
</ul>

<h2>Available Pipeline Tasks</h2>
<ul>
  <li><code>text-generation</code> — generate text or chat responses</li>
  <li><code>text-classification</code> / <code>sentiment-analysis</code> — classify text</li>
  <li><code>summarization</code> — condense long text</li>
  <li><code>translation_xx_to_yy</code> — translate between languages</li>
  <li><code>question-answering</code> — extract answers from a context</li>
  <li><code>fill-mask</code> — predict masked words</li>
  <li><code>zero-shot-classification</code> — classify without training</li>
  <li><code>feature-extraction</code> — generate embeddings</li>
  <li><code>automatic-speech-recognition</code> — transcribe audio</li>
</ul>

<h2>What's Next?</h2>
<ul>
  <li><strong>Fine-tuning</strong> — adapt a pre-trained model to your specific domain.</li>
  <li><strong>Serving locally</strong> — wrap your model in a FastAPI endpoint for local API access.</li>
  <li><strong>Integrating with RAG</strong> — use local embeddings + a local LLM for a fully offline RAG pipeline.</li>
  <li><strong>Using GGUF models with llama.cpp</strong> — for even more efficient local inference.</li>
</ul>
<p>Running models locally is one of the most empowering things you can do as an AI engineer. Full control, zero cost, total privacy. If you want to discuss local model setups, <a href="/#contact-section">reach out</a>.</p>
`;

export default function HuggingFaceLocalPipeline() {
  return (
    <BlogLayout
      category="HuggingFace"
      date="February 16, 2026"
      readTime="7 min read"
      title="Download & Run HuggingFace Models Locally"
      subtitle="No API keys, no cloud dependency, fully offline — download any HuggingFace model to your machine and run inference using the Transformers pipeline in a few lines of Python."
    >
      <div dangerouslySetInnerHTML={{ __html: articleHTML }} />
    </BlogLayout>
  );
}
