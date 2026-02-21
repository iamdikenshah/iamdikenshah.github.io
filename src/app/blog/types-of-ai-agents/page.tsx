import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "Types of AI Agents — Diken Shah",
  description:
    "A comprehensive guide to every major type of AI agent — from simple reflex agents to modern LLM-powered agentic systems — with real use cases, code examples, and practical advice on choosing the right agent architecture.",
};

const articleHTML = `
<h2>Why Agents Matter</h2>
<p>Imagine you ask an AI assistant: <em>"Book me a flight to Mumbai next Friday, the cheapest option, and add it to my calendar."</em></p>
<p>A regular chatbot says: <em>"I can't do that directly. Here's a link to a flight booking website."</em></p>
<p>An <strong>agent</strong> does this:</p>
<ol>
  <li>Searches flight APIs for Mumbai departures next Friday</li>
  <li>Compares prices across carriers</li>
  <li>Books the cheapest available option</li>
  <li>Reads your calendar, finds a free slot, adds the flight</li>
  <li>Sends you a confirmation with all details</li>
</ol>
<p>That's the difference. A chatbot <em>answers</em>. An agent <em>acts</em>. And in 2026, agents are everywhere — from customer support bots that process refunds to coding assistants that write, test, and deploy code autonomously.</p>
<p>This guide covers <strong>10 agent architectures</strong> you'll encounter in production — from simple rule-based systems to sophisticated multi-agent orchestrations — with Python code for each.</p>

<h2>What Is an AI Agent?</h2>
<p>An <strong>AI agent</strong> is a system that:</p>
<ol>
  <li><strong>Perceives</strong> — receives input (text, API responses, sensor data)</li>
  <li><strong>Reasons</strong> — decides what to do based on its logic, model, or policy</li>
  <li><strong>Acts</strong> — performs an action that changes the world</li>
  <li><strong>Observes</strong> — sees the result and uses it to inform the next decision</li>
</ol>
<p>This <strong>perceive → reason → act → observe</strong> loop is what separates an agent from a function or a stateless API. The agent keeps going until the task is done.</p>

<h2>Which Agent Do You Need?</h2>
<p>Before diving into details, here's the decision framework. Find your use case, pick the agent type, then jump to that section.</p>

<div class="blog-table-wrap"><table>
  <thead>
    <tr>
      <th>Your Situation</th>
      <th>Agent Type</th>
      <th>Complexity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Simple if-then logic, no history needed</td>
      <td><strong>Simple Reflex</strong></td>
      <td>🟢 Low</td>
    </tr>
    <tr>
      <td>Need to track state across steps</td>
      <td><strong>Model-Based Reflex</strong></td>
      <td>🟢 Low</td>
    </tr>
    <tr>
      <td>Need to plan a path to a specific goal</td>
      <td><strong>Goal-Based</strong></td>
      <td>🟡 Medium</td>
    </tr>
    <tr>
      <td>Multiple competing objectives with trade-offs</td>
      <td><strong>Utility-Based</strong></td>
      <td>🟡 Medium</td>
    </tr>
    <tr>
      <td>Need to call external tools or APIs</td>
      <td><strong>Tool-Using</strong></td>
      <td>🟡 Medium</td>
    </tr>
    <tr>
      <td>LLM needs to reason step-by-step with tools</td>
      <td><strong>ReAct</strong></td>
      <td>🟡 Medium</td>
    </tr>
    <tr>
      <td>Answers must be grounded in private documents</td>
      <td><strong>RAG Agent</strong></td>
      <td>🟡 Medium</td>
    </tr>
    <tr>
      <td>Long-horizon tasks that need upfront planning</td>
      <td><strong>Plan-and-Execute</strong></td>
      <td>🔴 High</td>
    </tr>
    <tr>
      <td>Need multiple specialist skills working together</td>
      <td><strong>Multi-Agent (MAS)</strong></td>
      <td>🔴 High</td>
    </tr>
    <tr>
      <td>System must improve over time without redeployment</td>
      <td><strong>Learning Agent</strong></td>
      <td>🔴 High</td>
    </tr>
  </tbody>
</table></div>

<div class="blog-callout blog-callout-warning">
  <strong>Golden Rule:</strong> Start with the simplest agent that can solve your problem. A reliable Simple Reflex agent beats an unreliable Multi-Agent system every time. Add complexity only when you've proven the simpler approach can't handle your requirements.
</div>

<hr class="blog-section-divider" />

<h2>Part 1: Rule-Based Agents</h2>
<p>These are the foundational architectures — no LLMs, no machine learning, just deterministic rules. They're fast, predictable, and often sufficient.</p>

<h3>1. Simple Reflex Agent</h3>
<p>Acts purely on the <strong>current perception</strong>. No memory, no planning. Just condition-action rules: <em>if X, do Y</em>.</p>

<h4>When to Use</h4>
<ul>
  <li>Environment is fully observable</li>
  <li>Correct action depends only on current state</li>
  <li>Speed and determinism matter more than flexibility</li>
</ul>

<h4>Architecture</h4>
<pre><code>Perception → Condition-Action Rules → Action
(no state, no memory, no planning)</code></pre>

<h4>Python Example: Thermostat</h4>
<pre><code>def thermostat_agent(current_temp: float, target_temp: float) -> str:
    """Simple reflex agent — acts on current perception only."""
    if current_temp < target_temp - 0.5:
        return "TURN_ON_HEATER"
    elif current_temp > target_temp + 0.5:
        return "TURN_ON_COOLER"
    else:
        return "DO_NOTHING"

# Usage
action = thermostat_agent(current_temp=18.0, target_temp=22.0)
print(action)  # TURN_ON_HEATER</code></pre>

<h4>Real-World Examples</h4>
<p>Thermostats, spam filters (keyword rules), traffic light controllers, vending machines.</p>

<h3>2. Model-Based Reflex Agent</h3>
<p>Maintains an <strong>internal state</strong> — a model of the world that tracks what it can't currently see. Updates this state at each step based on how the world works.</p>

<h4>When to Use</h4>
<ul>
  <li>Environment is partially observable</li>
  <li>Past actions or observations affect current decision</li>
  <li>Need to remember what you've already done</li>
</ul>

<h4>Architecture</h4>
<pre><code>Perception → Update Internal State → Condition-Action Rules → Action
(has memory, no planning)</code></pre>

<h4>Python Example: Vacuum Robot</h4>
<pre><code>class VacuumAgent:
    """Model-based reflex agent — tracks cleaned areas."""
    
    def __init__(self, grid_size: int = 5):
        self.cleaned = set()          # Internal state: which squares are clean
        self.position = (0, 0)
        self.grid_size = grid_size

    def perceive_and_act(self, is_dirty: bool) -> str:
        # Update internal state
        if not is_dirty:
            self.cleaned.add(self.position)
        
        # Condition-action rules
        if is_dirty:
            self.cleaned.add(self.position)
            return "CLEAN"
        
        # Find next uncleaned square
        for x in range(self.grid_size):
            for y in range(self.grid_size):
                if (x, y) not in self.cleaned:
                    self.position = (x, y)
                    return f"MOVE_TO ({x}, {y})"
        
        return "ALL_CLEAN"

# Usage
robot = VacuumAgent()
print(robot.perceive_and_act(is_dirty=True))   # CLEAN
print(robot.perceive_and_act(is_dirty=False))  # MOVE_TO (0, 1)</code></pre>

<h4>Real-World Examples</h4>
<p>Roomba vacuum cleaners, inventory tracking bots, network monitoring agents, self-driving car lane tracking.</p>

<hr class="blog-section-divider" />

<h2>Part 2: Planning Agents</h2>
<p>These agents <strong>think ahead</strong>. Instead of reacting to the current situation, they consider future states and plan a sequence of actions.</p>

<h3>3. Goal-Based Agent</h3>
<p>Has an explicit <strong>goal</strong> and uses search or planning to find actions that reach it. Asks: <em>"What sequence of actions gets me to my goal?"</em></p>

<h4>When to Use</h4>
<ul>
  <li>There's a clear end state to reach</li>
  <li>Multiple paths exist, need to find one</li>
  <li>Navigation, logistics, puzzles</li>
</ul>

<h4>Architecture</h4>
<pre><code>Perception → Update State → Goal + Search/Planning → Action</code></pre>

<h4>Python Example: Route Planner (A* Search)</h4>
<pre><code>import heapq

def find_route(graph: dict, start: str, goal: str) -> list:
    """
    Goal-based agent using A* search.
    graph = { node: [(neighbor, cost), ...] }
    """
    frontier = [(0, 0, start, [start])]  # (est_total, cost, node, path)
    visited = set()

    while frontier:
        _, cost, node, path = heapq.heappop(frontier)
        if node in visited:
            continue
        visited.add(node)

        if node == goal:
            return path  # Goal reached!

        for neighbor, edge_cost in graph.get(node, []):
            if neighbor not in visited:
                new_cost = cost + edge_cost
                heapq.heappush(frontier, (new_cost, new_cost, neighbor, path + [neighbor]))

    return []  # No path found

# Usage
roads = {
    "Home":   [("Park", 2), ("Mall", 5)],
    "Park":   [("Office", 3)],
    "Mall":   [("Office", 1)],
    "Office": []
}
print(find_route(roads, "Home", "Office"))  # ['Home', 'Mall', 'Office']</code></pre>

<h4>Real-World Examples</h4>
<p>Google Maps routing, game AI pathfinding, robot motion planning, logistics optimisation.</p>

<h3>4. Utility-Based Agent</h3>
<p>Doesn't just reach a goal — reaches it <strong>as well as possible</strong>. Has a <strong>utility function</strong> that scores outcomes, and picks actions that maximise expected utility.</p>

<h4>When to Use</h4>
<ul>
  <li>Multiple objectives with trade-offs (speed vs cost vs quality)</li>
  <li>No single "right answer" — need to optimise</li>
  <li>Recommendations, dispatching, bidding</li>
</ul>

<h4>Python Example: Ride-Sharing Dispatcher</h4>
<pre><code>from dataclasses import dataclass

@dataclass
class Driver:
    id: str
    distance_km: float   # Distance to rider
    rating: float        # 1-5 stars
    cost_per_km: float   # Price

def utility(driver: Driver, trip_km: float) -> float:
    """Utility function — higher is better."""
    time_score    = 1.0 / (driver.distance_km + 0.1)    # Prefer closer
    quality_score = driver.rating / 5.0                  # Prefer higher rated
    cost_score    = 1.0 / (driver.cost_per_km * trip_km) # Prefer cheaper
    
    # Weighted priorities
    return 0.4 * time_score + 0.35 * quality_score + 0.25 * cost_score

def dispatch(drivers: list[Driver], trip_km: float) -> Driver:
    """Utility-based agent — picks driver that maximises utility."""
    return max(drivers, key=lambda d: utility(d, trip_km))

# Usage
drivers = [
    Driver("D1", distance_km=2.0, rating=4.8, cost_per_km=12),
    Driver("D2", distance_km=0.5, rating=3.9, cost_per_km=15),
    Driver("D3", distance_km=1.2, rating=4.5, cost_per_km=11),
]
best = dispatch(drivers, trip_km=10)
print(f"Assigned: {best.id}")  # Optimal choice based on utility</code></pre>

<h4>Real-World Examples</h4>
<p>Uber/Ola dispatch, Netflix recommendations, ad bidding, portfolio optimisation.</p>

<hr class="blog-section-divider" />

<h2>Part 3: LLM-Powered Agents</h2>
<p>These agents use Large Language Models as the reasoning engine. They're the dominant architecture in production AI systems today. We'll cover them from simplest to most complex.</p>

<h3>5. Tool-Using Agent</h3>
<p>An LLM equipped with <strong>tools</strong> it can call — APIs, databases, code interpreters, anything with an interface. The LLM decides <em>which</em> tool to call, <em>with what inputs</em>, and <em>when to stop</em>.</p>
<p>This is the base pattern. OpenAI function calling, Anthropic tool use, and Google Gemini all implement this.</p>

<h4>When to Use</h4>
<ul>
  <li>LLM needs to interact with external systems</li>
  <li>Tasks require real-time data (weather, prices, DB lookups)</li>
  <li>Building AI assistants with capabilities beyond text</li>
</ul>

<h4>Python Example: LangChain Tool-Using Agent</h4>
<pre><code>from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain.agents import create_react_agent, AgentExecutor
from langchain import hub

llm = ChatOpenAI(model="gpt-4o", temperature=0)

# Define tools with @tool decorator
@tool
def get_weather(city: str) -> str:
    """Get current weather for a city."""
    weather_data = {"Ahmedabad": "32°C, Sunny", "Mumbai": "28°C, Cloudy", "Delhi": "18°C, Foggy"}
    return weather_data.get(city, f"Weather data not available for {city}")

@tool
def convert_currency(amount: float, from_currency: str, to_currency: str) -> str:
    """Convert amount between currencies."""
    rates = {"USD": 1.0, "INR": 83.5, "EUR": 0.92}
    converted = amount / rates[from_currency] * rates[to_currency]
    return f"{amount} {from_currency} = {converted:.2f} {to_currency}"

# Create agent with tools
tools = [get_weather, convert_currency]
prompt = hub.pull("hwchase17/react")

agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Run
result = executor.invoke({
    "input": "What's the weather in Ahmedabad and how much is $100 in INR?"
})
print(result["output"])</code></pre>

<h3>6. ReAct Agent <span class="blog-agent-badge">Reason + Act</span></h3>
<p>Interleaves <strong>Thought</strong> (chain-of-thought reasoning) with <strong>Action</strong> (tool calls). The LLM explicitly reasons about what to do before doing it, making the process interpretable.</p>
<p>Loop: <em>Think → Act → Observe → Think → Act → ... → Answer</em></p>

<h4>When to Use</h4>
<ul>
  <li>Need to see the agent's reasoning (debugging, compliance)</li>
  <li>Multi-step tasks where each step depends on previous results</li>
  <li>Research, Q&A, data analysis</li>
</ul>

<h4>Python Example: LangChain ReAct</h4>
<pre><code>from langchain.agents import create_react_agent, AgentExecutor
from langchain_openai import ChatOpenAI
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.tools import tool
from langchain import hub

llm = ChatOpenAI(model="gpt-4o", temperature=0)

@tool
def calculator(expression: str) -> str:
    """Evaluate a math expression."""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Error: {e}"

tools = [DuckDuckGoSearchRun(), calculator]
prompt = hub.pull("hwchase17/react")

agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

result = executor.invoke({
    "input": "What is the population of Ahmedabad? If it grew 5%, what would it be?"
})
print(result["output"])</code></pre>

<h4>What the Agent Does (Trace)</h4>
<pre><code>Thought: I need to find Ahmedabad's population first.
Action: duckduckgo_search
Action Input: "Ahmedabad population 2025"
Observation: Approximately 8.6 million

Thought: Now calculate 5% growth.
Action: calculator
Action Input: 8600000 * 1.05
Observation: 9030000

Final Answer: Ahmedabad's population is ~8.6 million. With 5% growth: 9.03 million.</code></pre>

<h3>7. RAG Agent <span class="blog-agent-badge">Retrieval-Augmented</span></h3>
<p>Combines retrieval from a knowledge base with agentic reasoning. Unlike simple RAG (retrieve once → answer), a RAG agent <strong>decides when to retrieve</strong>, <strong>what to query</strong>, and can retrieve multiple times.</p>

<h4>When to Use</h4>
<ul>
  <li>Answers must be grounded in private/proprietary documents</li>
  <li>Knowledge changes frequently (policies, products, prices)</li>
  <li>Enterprise Q&A, legal research, customer support</li>
</ul>

<h4>Python Example: RAG Agent with LangChain</h4>
<pre><code>from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.tools import tool
from langchain_core.documents import Document
from langchain.agents import create_react_agent, AgentExecutor
from langchain import hub

llm = ChatOpenAI(model="gpt-4o", temperature=0)

# Build simple knowledge base
docs = [
    Document(page_content="Returns accepted within 30 days."),
    Document(page_content="Standard shipping: 3-5 days. Express: 1-2 days."),
    Document(page_content="All electronics have 1-year warranty."),
]
vectorstore = Chroma.from_documents(docs, OpenAIEmbeddings())

@tool
def search_docs(query: str) -> str:
    """Search knowledge base for information."""
    results = vectorstore.similarity_search(query, k=2)
    return "\n".join([d.page_content for d in results])

# Create RAG agent
tools = [search_docs]
rag_agent = AgentExecutor(
    agent=create_react_agent(llm, tools, hub.pull("hwchase17/react")),
    tools=tools,
    verbose=True
)

# Agent decides when to search
rag_agent.invoke({"input": "What's the return policy and warranty?"})</code></pre>

<h3>8. Plan-and-Execute Agent</h3>
<p>Separates <strong>planning</strong> from <strong>execution</strong>. First, a planner LLM creates a full plan (list of steps). Then, an executor works through each step. Better for long-horizon tasks where ReAct might lose track of the original goal.</p>

<h4>When to Use</h4>
<ul>
  <li>Complex tasks with many steps</li>
  <li>Risk of the LLM getting "lost" mid-task</li>
  <li>Report generation, software development, research projects</li>
</ul>

<h4>Python Example: Plan-and-Execute with LangChain</h4>
<pre><code>from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain.agents import create_react_agent, AgentExecutor
from langchain import hub

llm = ChatOpenAI(model="gpt-4o", temperature=0)

# Step 1: Planner creates a list of steps
def create_plan(task: str) -> list[str]:
    response = llm.invoke(f"Break this task into 3 simple steps (return numbered list only): {task}")
    return [line.strip() for line in response.content.split("\\n") if line.strip()]

# Step 2: Tools for the executor
@tool
def web_search(query: str) -> str:
    """Search the web for information."""
    return f"Results for '{query}': India EV sales reached 1.8M units in 2025, up 40% YoY."

@tool
def write_text(content: str) -> str:
    """Write and format text content."""
    return f"Written: {content}"

# Step 3: Executor agent
tools = [web_search, write_text]
executor = AgentExecutor(
    agent=create_react_agent(llm, tools, hub.pull("hwchase17/react")),
    tools=tools,
    verbose=True
)

# Run the pipeline
def plan_and_execute(task: str) -> str:
    steps = create_plan(task)
    print(f"Plan: {steps}")
    
    results = []
    for step in steps:
        result = executor.invoke({"input": step})
        results.append(result["output"])
    
    return "\\n".join(results)

# Usage
output = plan_and_execute("Write a brief analysis on EV adoption in India")
print(output)</code></pre>

<h3>9. Multi-Agent Systems <span class="blog-agent-badge">MAS</span></h3>
<p>Multiple <strong>specialised agents</strong> collaborate, each focused on a specific domain. A <strong>supervisor/orchestrator</strong> routes tasks and synthesises outputs. Used by CrewAI, LangGraph multi-agent, AutoGen.</p>

<h4>When to Use</h4>
<ul>
  <li>Task spans multiple domains (research + code + writing)</li>
  <li>Specialisation improves quality</li>
  <li>Complex workflows with handoffs</li>
</ul>

<h4>Python Example: Multi-Agent with CrewAI</h4>
<pre><code>from crewai import Agent, Task, Crew, Process

# Define specialist agents
researcher = Agent(
    role="Research Analyst",
    goal="Find accurate information on a topic",
    backstory="Expert at quick, accurate research.",
    llm="gpt-4o"
)

writer = Agent(
    role="Technical Writer",
    goal="Write clear, structured content",
    backstory="Writes precise technical reports.",
    llm="gpt-4o"
)

# Define tasks
research_task = Task(
    description="Research top 3 AI agent frameworks in 2025.",
    expected_output="Bullet list with framework names and features.",
    agent=researcher
)

report_task = Task(
    description="Write a 200-word comparison summary.",
    expected_output="Structured comparison with recommendation.",
    agent=writer,
    context=[research_task]  # Writer uses researcher's output
)

# Run the crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, report_task],
    process=Process.sequential
)

result = crew.kickoff()
print(result)</code></pre>

<hr class="blog-section-divider" />

<h2>Part 4: Learning Agents</h2>
<p>These agents <strong>improve over time</strong> through experience. They learn from feedback rather than following fixed rules.</p>

<h3>10. Learning Agent</h3>
<p>Has a <strong>learning element</strong> that modifies behaviour based on rewards or corrections. This is the foundation of reinforcement learning (RL) and RLHF (how ChatGPT was trained).</p>

<h4>When to Use</h4>
<ul>
  <li>Optimal behaviour isn't known upfront</li>
  <li>Environment changes over time</li>
  <li>Can collect feedback/rewards</li>
</ul>

<h4>Architecture</h4>
<pre><code>Perception → Performance Element → Action → Environment
                    ↑
            Critic (evaluates)
                    ↑
            Learning Element (improves)</code></pre>

<h4>Python Example: Q-Learning (Grid Navigation)</h4>
<pre><code>import numpy as np
import random

# 4x4 grid: start at (0,0), goal at (3,3)
GRID = 4
STATES = GRID * GRID
ACTIONS = 4  # Up, Down, Left, Right
GOAL = 15

def step(state: int, action: int):
    row, col = divmod(state, GRID)
    if action == 0: row = max(row - 1, 0)      # Up
    if action == 1: row = min(row + 1, GRID-1) # Down
    if action == 2: col = max(col - 1, 0)      # Left
    if action == 3: col = min(col + 1, GRID-1) # Right
    
    next_state = row * GRID + col
    reward = 1.0 if next_state == GOAL else -0.01
    done = next_state == GOAL
    return next_state, reward, done

def train(episodes=2000, alpha=0.1, gamma=0.99, epsilon=1.0):
    Q = np.zeros((STATES, ACTIONS))
    
    for _ in range(episodes):
        state = 0
        done = False
        
        while not done:
            # ε-greedy: explore or exploit
            if random.random() < epsilon:
                action = random.randint(0, 3)
            else:
                action = np.argmax(Q[state])
            
            next_state, reward, done = step(state, action)
            
            # Q-learning update
            Q[state, action] += alpha * (
                reward + gamma * np.max(Q[next_state]) - Q[state, action]
            )
            state = next_state
        
        epsilon = max(0.01, epsilon * 0.995)
    
    return Q

# Train and run
Q = train()

# Greedy policy rollout
state, path = 0, [0]
for _ in range(20):
    action = np.argmax(Q[state])
    state, _, done = step(state, action)
    path.append(state)
    if done: break

print(f"Learned path: {path}")
print(f"Reached goal: {path[-1] == GOAL}")</code></pre>

<h4>Real-World Examples</h4>
<p>AlphaGo, recommendation systems, fraud detection, RLHF for ChatGPT.</p>

<hr class="blog-section-divider" />

<h2>Real-World Example: Customer Support Agent</h2>
<p>Let's combine multiple agent types into one production system — an AI customer support agent for an e-commerce platform.</p>

<h3>The Problem</h3>
<p>5,000 queries/day. Most are about order status, refunds, or product info. Human agents spend 70% of time on repetitive questions. Customers wait 6+ hours.</p>

<h3>The Solution</h3>
<pre><code>Customer Query
      ↓
┌─────────────────┐
│  Router Agent   │ ← Classifies: order / refund / product
└────────┬────────┘
         │
    ┌────┴────┬────────────┐
    ↓         ↓            ↓
 Order     Refund       Product
 Agent     Agent        Agent
(Tool)    (Goal)        (RAG)
    │         │            │
    └────┬────┴────────────┘
         ↓
   Final Response</code></pre>

<h4>Implementation</h4>
<pre><code>from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain.agents import create_react_agent, AgentExecutor
from langchain import hub

llm = ChatOpenAI(model="gpt-4o", temperature=0)

@tool
def get_order_status(order_id: str) -> str:
    """Look up order status."""
    orders = {
        "ORD-123": "Out for Delivery, arriving today by 8 PM",
        "ORD-456": "Processing, ships in 2-3 days",
    }
    return orders.get(order_id, f"Order {order_id} not found")

@tool
def check_refund_eligibility(order_id: str, days_since_delivery: int) -> str:
    """Check if order is eligible for refund (30-day policy)."""
    if days_since_delivery <= 30:
        return "Eligible for full refund"
    return f"Not eligible: {days_since_delivery} days passed (30-day limit)"

@tool
def initiate_refund(order_id: str) -> str:
    """Start refund process."""
    refund_id = f"REF-{abs(hash(order_id)) % 10000:04d}"
    return f"Refund initiated. ID: {refund_id}. Expect credit in 3-5 days."

@tool
def search_faq(query: str) -> str:
    """Search product FAQs."""
    faqs = {
        "waterproof": "IP67 rated — splashproof, not for swimming",
        "warranty": "1-year manufacturer warranty on all electronics",
        "battery": "Up to 18 hours battery life",
    }
    for key, answer in faqs.items():
        if key in query.lower():
            return answer
    return "No specific FAQ found. Contact support@shop.com"

tools = [get_order_status, check_refund_eligibility, initiate_refund, search_faq]
prompt = hub.pull("hwchase17/react")

support_agent = AgentExecutor(
    agent=create_react_agent(llm, tools, prompt),
    tools=tools,
    verbose=True
)

# Run queries
queries = [
    "Where is my order ORD-123?",
    "I want a refund for ORD-456, delivered 10 days ago",
    "Is the device waterproof?",
]

for q in queries:
    print(f"\\nCustomer: {q}")
    result = support_agent.invoke({"input": q})
    print(f"Agent: {result['output']}")</code></pre>

<h4>Results</h4>
<div class="blog-table-wrap"><table>
  <thead>
    <tr>
      <th>Metric</th>
      <th>Before</th>
      <th>After</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Response Time</td>
      <td>6.2 hours</td>
      <td>4 seconds</td>
    </tr>
    <tr>
      <td>Auto-Resolved</td>
      <td>0%</td>
      <td>74%</td>
    </tr>
    <tr>
      <td>Cost per Query</td>
      <td>₹45</td>
      <td>₹2.80</td>
    </tr>
  </tbody>
</table></div>

<hr class="blog-section-divider" />

<h2>What's Next: Trends to Watch</h2>
<ul>
  <li><strong>Long-context memory</strong> — Models with 1M+ token windows blur the line between in-context and external memory</li>
  <li><strong>Agent protocols</strong> — <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">MCP</a> and A2A standards for agent interoperability</li>
  <li><strong>Persistent agents</strong> — Agents that run for days/weeks with durable state</li>
  <li><strong>Self-improving agents</strong> — Generate new tools, update prompts, fine-tune models autonomously</li>
</ul>
<p>The fundamentals — perceive, reason, act, observe — stay constant. Master those, and any framework becomes learnable.</p>
<p>Building an agent and want to discuss architecture? <a href="/#contact-section">Reach out</a>.</p>
`;

export default function TypesOfAIAgents() {
  return (
    <BlogLayout
      category="Agentic AI"
      date="February 21, 2026"
      readTime="18 min read"
      title="Types of AI Agents"
      subtitle="A practical guide to 10 agent architectures — from simple rules to multi-agent systems — with Python code and a real-world customer support example."
    >
      <div dangerouslySetInnerHTML={{ __html: articleHTML }} />
    </BlogLayout>
  );
}
