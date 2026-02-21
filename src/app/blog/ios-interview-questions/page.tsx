"use client";

import BlogLayout from "@/components/BlogLayout";
import { useState } from "react";

interface QAItem {
  id: string;
  number: number | string;
  question: string;
  answerHTML: string;
  level: "beginner" | "intermediate" | "advanced";
}

const beginnerQA: QAItem[] = [
  {
    id: "b1",
    number: 1,
    level: "beginner",
    question: "What is the difference between var and let in Swift?",
    answerHTML: `<p><code>let</code> declares a <strong>constant</strong> — its value cannot be changed after assignment. <code>var</code> declares a <strong>variable</strong> — its value can be reassigned.</p>
<pre><code>let name = "Diken"     // constant — cannot reassign
var age = 30           // variable — can reassign
age = 31               // ✅ valid
// name = "Other"      // ❌ compiler error</code></pre>
<p>Best practice: always prefer <code>let</code>. Use <code>var</code> only when mutation is genuinely needed.</p>`,
  },
  {
    id: "b2",
    number: 2,
    level: "beginner",
    question: "What is an Optional in Swift and why does it exist?",
    answerHTML: `<p>An <strong>Optional</strong> is a type that can hold either a value or <code>nil</code> (absence of value). In Swift, non-optional types are guaranteed to always have a value — this forces you to explicitly handle the "no value" case, preventing null pointer crashes common in Objective-C.</p>
<pre><code>var username: String? = nil   // Optional — can be nil
var city: String = "Ahmedabad" // Non-optional — always has a value

if let name = username {
    print("Hello, \\(name)")
} else {
    print("No username set")
}

let display = username ?? "Guest"</code></pre>
<p><strong>Force unwrapping</strong> (<code>username!</code>) crashes if the value is nil. Use it only when you are 100% certain a value exists.</p>`,
  },
  {
    id: "b3",
    number: 3,
    level: "beginner",
    question: "What is the difference between a struct and a class in Swift?",
    answerHTML: `<p>The core difference is <strong>value type vs reference type</strong>:</p>
<ul>
<li><strong>struct</strong> — value type. When copied, a new independent copy is made.</li>
<li><strong>class</strong> — reference type. When assigned or passed, multiple variables point to the same instance.</li>
</ul>
<pre><code>struct Point { var x: Int; var y: Int }
var a = Point(x: 0, y: 0)
var b = a       // b is a COPY
b.x = 10
print(a.x)      // 0 — a unchanged

class Counter { var count = 0 }
let c1 = Counter()
let c2 = c1     // c2 points to the SAME object
c2.count = 10
print(c1.count) // 10 — c1 is affected</code></pre>
<p>Classes support inheritance; structs do not. Prefer structs by default — use classes when identity semantics or inheritance are needed.</p>`,
  },
  {
    id: "b4",
    number: 4,
    level: "beginner",
    question: "What is the App Delegate and what is its role?",
    answerHTML: `<p>The <strong>AppDelegate</strong> is the entry point for UIKit apps. It conforms to <code>UIApplicationDelegate</code> and responds to app-level lifecycle events:</p>
<ul>
<li><code>application(_:didFinishLaunchingWithOptions:)</code> — app launched, set up initial config</li>
<li><code>applicationDidEnterBackground(_:)</code> — app moved to background</li>
<li><code>applicationWillEnterForeground(_:)</code> — app about to foreground</li>
<li><code>applicationWillTerminate(_:)</code> — app about to terminate</li>
</ul>
<p>In iOS 13+, most lifecycle handling moved to <code>SceneDelegate</code>. AppDelegate now primarily handles app launch and background tasks like push notification registration.</p>`,
  },
  {
    id: "b5",
    number: 5,
    level: "beginner",
    question: "What is AutoLayout and why do we use it?",
    answerHTML: `<p><strong>AutoLayout</strong> is a constraint-based layout system that describes relationships between UI elements. Instead of hardcoding frames, you define rules — iOS calculates actual frames at runtime for any screen size.</p>
<pre><code>button.translatesAutoresizingMaskIntoConstraints = false
NSLayoutConstraint.activate([
    button.centerXAnchor.constraint(equalTo: view.centerXAnchor),
    button.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20),
    button.widthAnchor.constraint(equalToConstant: 200),
    button.heightAnchor.constraint(equalToConstant: 50)
])</code></pre>
<p>AutoLayout makes layouts adaptive across iPhone SE to iPad Pro, orientations, and dynamic text sizes.</p>`,
  },
  {
    id: "b6",
    number: 6,
    level: "beginner",
    question: "What is a closure in Swift?",
    answerHTML: `<p>A <strong>closure</strong> is a self-contained block of code that can be passed around and executed later. Closures capture and store references to variables from the surrounding context.</p>
<pre><code>let greet = { (name: String) -> String in "Hello, \\(name)!" }
print(greet("Diken"))  // "Hello, Diken!"

// Trailing closure syntax
let sorted = [3, 1, 4, 1, 5].sorted { $0 < $1 }

// Capturing values
func makeCounter() -> () -> Int {
    var count = 0
    return { count += 1; return count }
}
let counter = makeCounter()
print(counter())  // 1, then 2, then 3...</code></pre>
<p>Closures are used extensively for callbacks, animations, completion handlers, and functional operations like <code>map</code>, <code>filter</code>, <code>reduce</code>.</p>`,
  },
  {
    id: "b7",
    number: 7,
    level: "beginner",
    question: "What is the difference between UIView and CALayer?",
    answerHTML: `<p>Every <code>UIView</code> has an underlying <code>CALayer</code> (Core Animation layer):</p>
<ul>
<li><strong>UIView</strong> — handles user interaction, touch events, participates in the responder chain, manages layout.</li>
<li><strong>CALayer</strong> — handles actual rendering and drawing. Responsible for <code>cornerRadius</code>, <code>shadowOpacity</code>, <code>borderWidth</code>, animations.</li>
</ul>
<pre><code>view.layer.cornerRadius = 12
view.layer.borderWidth = 1
view.layer.borderColor = UIColor.systemBlue.cgColor
view.layer.shadowOpacity = 0.3
view.layer.shadowOffset = CGSize(width: 0, height: 4)</code></pre>`,
  },
  {
    id: "b8",
    number: 8,
    level: "beginner",
    question: "What is a protocol in Swift?",
    answerHTML: `<p>A <strong>protocol</strong> defines a blueprint of methods, properties, and requirements. Any type conforming to the protocol must implement those requirements. Protocols are Swift's primary tool for abstraction and polymorphism.</p>
<pre><code>protocol Drawable {
    var color: String { get }
    func draw()
}

struct Circle: Drawable {
    let color: String
    func draw() { print("Drawing a \\(color) circle") }
}

let shapes: [Drawable] = [Circle(color: "red")]
shapes.forEach { $0.draw() }</code></pre>
<p>Protocols are the backbone of iOS — <code>UITableViewDataSource</code>, <code>Decodable</code>, <code>Equatable</code> are all protocols.</p>`,
  },
  {
    id: "b9",
    number: 9,
    level: "beginner",
    question: "What is the difference between frame and bounds in UIKit?",
    answerHTML: `<ul>
<li><strong>frame</strong> — the view's position and size in its <em>parent's</em> coordinate system.</li>
<li><strong>bounds</strong> — the view's internal coordinate space, always starting at (0,0).</li>
</ul>
<pre><code>let view = UIView(frame: CGRect(x: 50, y: 100, width: 200, height: 100))
print(view.frame)   // (50, 100, 200, 100) — position in parent
print(view.bounds)  // (0, 0, 200, 100) — always starts at 0,0</code></pre>
<p>When implementing <code>draw(_:)</code>, always work in <code>bounds</code>. When a view is rotated, the <code>frame</code> changes to encompass it, but <code>bounds</code> stays the same.</p>`,
  },
  {
    id: "b10",
    number: 10,
    level: "beginner",
    question: "What is UserDefaults and when should you use it?",
    answerHTML: `<p><strong>UserDefaults</strong> is a persistent key-value store for simple user preferences. Data persists across app launches.</p>
<pre><code>UserDefaults.standard.set(true, forKey: "isDarkModeEnabled")
let isDark = UserDefaults.standard.bool(forKey: "isDarkModeEnabled")
UserDefaults.standard.removeObject(forKey: "isDarkModeEnabled")</code></pre>
<p><strong>Use for:</strong> user preferences, small flags (onboarding shown, notifications enabled).</p>
<p><strong>Never use for:</strong> sensitive data (use Keychain), large data (use CoreData/files). UserDefaults is not encrypted.</p>`,
  },
];

const intermediateQA: QAItem[] = [
  {
    id: "i1",
    number: 1,
    level: "intermediate",
    question: "Explain ARC (Automatic Reference Counting) and retain cycles.",
    answerHTML: `<p><strong>ARC</strong> automatically manages memory by tracking how many references point to each class instance. When the count reaches zero, the object is deallocated.</p>
<p>A <strong>retain cycle</strong> occurs when two objects hold strong references to each other, preventing the count from ever reaching zero — causing a memory leak.</p>
<pre><code>// Retain cycle
class Child { var parent: Parent? }  // strong — CYCLE!

// Fix: weak reference
class Child { weak var parent: Parent? }

// Closure retain cycle
viewModel.onUpdate = { self.tableView.reloadData() }  // CYCLE

// Fix
viewModel.onUpdate = { [weak self] in self?.tableView.reloadData() }</code></pre>
<p>Use <code>weak</code> when the reference might become nil. Use <code>unowned</code> when you're sure the referenced object outlives the closure.</p>`,
  },
  {
    id: "i2",
    number: 2,
    level: "intermediate",
    question: "What is the difference between GCD and OperationQueue?",
    answerHTML: `<ul>
<li><strong>GCD</strong> — low-level C-based API. Simple, lightweight. Best for straightforward async work.</li>
<li><strong>OperationQueue</strong> — higher-level, built on GCD. Supports dependencies, cancellation, priorities. Best for complex scheduling.</li>
</ul>
<pre><code>// GCD
DispatchQueue.global(qos: .background).async {
    let data = fetchData()
    DispatchQueue.main.async { self.updateUI(with: data) }
}

// OperationQueue with dependencies
let fetchOp = BlockOperation { /* fetch */ }
let processOp = BlockOperation { /* process */ }
processOp.addDependency(fetchOp)
let queue = OperationQueue()
queue.addOperations([fetchOp, processOp], waitUntilFinished: false)</code></pre>
<p>In modern Swift, both are largely superseded by <strong>async/await</strong> with Swift Concurrency.</p>`,
  },
  {
    id: "i3",
    number: 3,
    level: "intermediate",
    question: "What are @escaping and @nonescaping closures?",
    answerHTML: `<p>A <strong>non-escaping closure</strong> (default) is guaranteed to execute before the function returns. An <strong>@escaping closure</strong> is stored or executed asynchronously — it can be called <em>after</em> the function has returned.</p>
<pre><code>// Non-escaping — runs synchronously before function returns
func doWork(completion: () -> Void) { completion() }

// @escaping — stored and called later
class NetworkManager {
    func fetchData(completion: @escaping () -> Void) {
        URLSession.shared.dataTask(with: url) { _, _, _ in
            DispatchQueue.main.async { completion() }  // called async — must @escape
        }.resume()
    }
}</code></pre>
<p>With <code>@escaping</code>, the compiler requires explicit <code>self</code> reference — a hint that a retain cycle is possible.</p>`,
  },
  {
    id: "i4",
    number: 4,
    level: "intermediate",
    question: "What is the MVVM pattern and how does it work in iOS?",
    answerHTML: `<p><strong>MVVM</strong> (Model-View-ViewModel) separates concerns:</p>
<ul>
<li><strong>Model</strong> — data and business logic</li>
<li><strong>View</strong> — UI (UIViewController/SwiftUI View). Passively renders state.</li>
<li><strong>ViewModel</strong> — transforms Model data into View-ready state. No UIKit imports.</li>
</ul>
<pre><code>final class ArticleViewModel: ObservableObject {
    @Published var title: String = ""
    @Published var readTimeSummary: String = ""

    func configure(with article: Article) {
        title = article.title
        readTimeSummary = "\\(article.readTimeMinutes) min read"
    }
}

struct ArticleRow: View {
    @ObservedObject var vm: ArticleViewModel
    var body: some View {
        VStack(alignment: .leading) {
            Text(vm.title).font(.headline)
            Text(vm.readTimeSummary).font(.caption)
        }
    }
}</code></pre>`,
  },
  {
    id: "i5",
    number: 5,
    level: "intermediate",
    question: "How does URLSession work and what are its key components?",
    answerHTML: `<p>Key components: <strong>URLSession</strong> (manages tasks), <strong>URLSessionConfiguration</strong> (defines behaviour), <strong>URLSessionTask</strong> (individual request), <strong>URLRequest</strong> (configures headers/body).</p>
<pre><code>func fetchUser(id: Int) async throws -> User {
    var request = URLRequest(url: URL(string: "https://api.example.com/users/\\(id)")!)
    request.httpMethod = "GET"
    request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization")

    let (data, response) = try await URLSession.shared.data(for: request)
    guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
        throw URLError(.badServerResponse)
    }
    return try JSONDecoder().decode(User.self, from: data)
}</code></pre>
<p>Use <code>.default</code> for standard requests, <code>.ephemeral</code> for private browsing, <code>.background</code> for downloads that continue when the app is backgrounded.</p>`,
  },
  {
    id: "i6",
    number: 6,
    level: "intermediate",
    question: "What is the difference between @State, @Binding, and @ObservedObject in SwiftUI?",
    answerHTML: `<ul>
<li><strong>@State</strong> — local state owned by a single view. Simple value types.</li>
<li><strong>@Binding</strong> — reference to state owned by a parent view. Two-way connection.</li>
<li><strong>@ObservedObject</strong> — for external reference types conforming to <code>ObservableObject</code>.</li>
<li><strong>@StateObject</strong> — like @ObservedObject, but the view <em>owns</em> the object's lifetime. Use this to create the object.</li>
</ul>
<pre><code>struct CounterView: View {
    @State private var count = 0
    var body: some View {
        Stepper("Count: \\(count)", value: $count) // $count is a Binding
    }
}

struct HomeView: View {
    @StateObject private var vm = HomeViewModel() // view owns the object
}</code></pre>`,
  },
  {
    id: "i7",
    number: 7,
    level: "intermediate",
    question: "How does Codable work in Swift?",
    answerHTML: `<p><strong>Codable</strong> is a type alias for <code>Encodable &amp; Decodable</code>. Conforming types can be automatically serialized to/from JSON without manual parsing.</p>
<pre><code>struct Product: Codable {
    let id: Int
    let name: String
    let isAvailable: Bool

    enum CodingKeys: String, CodingKey {
        case id, name
        case isAvailable = "is_available"  // map snake_case
    }
}

// Decode
let product = try JSONDecoder().decode(Product.self, from: jsonData)

// Encode
let data = try JSONEncoder().encode(product)</code></pre>
<p>Use <code>keyDecodingStrategy = .convertFromSnakeCase</code> on <code>JSONDecoder</code> to avoid manual <code>CodingKeys</code> for standard APIs.</p>`,
  },
  {
    id: "i8",
    number: 8,
    level: "intermediate",
    question: "What is the responder chain in iOS?",
    answerHTML: `<p>The <strong>responder chain</strong> is how UIKit handles events (touches, motion, menu actions). When an event occurs, UIKit passes it to the first responder — if not handled, it travels up the chain.</p>
<p>Chain: <code>UIView → UIViewController → UIWindow → UIApplication → AppDelegate</code></p>
<pre><code>textField.becomeFirstResponder()  // show keyboard
textField.resignFirstResponder()  // hide keyboard

// Send action up the chain until someone handles it
UIApplication.shared.sendAction(#selector(handleAction), to: nil, from: self, for: nil)</code></pre>`,
  },
  {
    id: "i9",
    number: 9,
    level: "intermediate",
    question: "What is dependency injection and why is it important in iOS?",
    answerHTML: `<p><strong>Dependency Injection (DI)</strong> means providing an object's dependencies from outside rather than letting it create them. This decouples components and makes them independently testable.</p>
<pre><code>// Without DI — tightly coupled
class UserViewModel {
    private let api = NetworkManager()  // creates its own — untestable
}

// With DI — loosely coupled
protocol UserService { func fetchUser(id: Int) async throws -> User }

class UserViewModel {
    private let service: UserService  // injected — can be mocked
    init(service: UserService) { self.service = service }
}

let vm = UserViewModel(service: DefaultUserService())   // production
let vm = UserViewModel(service: MockUserService())      // test</code></pre>`,
  },
  {
    id: "i10",
    number: 10,
    level: "intermediate",
    question: "What is the difference between async/await and closures for async work?",
    answerHTML: `<p>Swift's <strong>async/await</strong> provides linear, readable code instead of nested callbacks.</p>
<pre><code>// Closures — callback hell
func loadProfile(userId: Int) {
    fetchUser(userId) { result in
        switch result {
        case .success(let user):
            fetchPosts(user.id) { result in
                // more nesting...
            }
        case .failure: break
        }
    }
}

// async/await — clean and linear
func loadProfile(userId: Int) async throws {
    let user = try await fetchUser(userId)
    let posts = try await fetchPosts(user.id)
    await MainActor.run { update(user: user, posts: posts) }
}</code></pre>
<p>async/await also composes with <code>async let</code> and <code>TaskGroup</code> for parallel execution while maintaining clean code.</p>`,
  },
];

const advancedQA: QAItem[] = [
  {
    id: "a1",
    number: 1,
    level: "advanced",
    question: "How does Swift's actor model prevent data races?",
    answerHTML: `<p>An <strong>actor</strong> (Swift 5.5+) protects its mutable state from concurrent access. Only one piece of code can execute on an actor at a time — all accesses are serialised. This eliminates data races at the compiler level without manual locks.</p>
<pre><code>actor BankAccount {
    var balance: Double = 0
    func deposit(_ amount: Double) { balance += amount }
    func getBalance() -> Double { balance }
}

let account = BankAccount()
await account.deposit(100)
let balance = await account.getBalance()

// @MainActor — special actor on the main thread
@MainActor
class ViewModel: ObservableObject {
    @Published var title = ""  // guaranteed main thread
}</code></pre>`,
  },
  {
    id: "a2",
    number: 2,
    level: "advanced",
    question: "Explain method dispatch in Swift — static, dynamic, and table dispatch.",
    answerHTML: `<ul>
<li><strong>Static (Direct) Dispatch</strong> — compiler knows the method at compile time. Fastest. Used for <code>struct</code> methods, <code>final class</code> methods.</li>
<li><strong>Table Dispatch (Virtual)</strong> — vtable (classes) or witness table (protocols) consulted at runtime. Moderate overhead.</li>
<li><strong>Message Dispatch</strong> — via Objective-C runtime for <code>@objc dynamic</code> methods. Most flexible (supports swizzling), slowest.</li>
</ul>
<pre><code>// Static dispatch
struct Renderer { func render() { } }  // direct call

// Table dispatch
class Animal { func speak() { print("...") } }
class Dog: Animal { override func speak() { print("Woof") } }

// Message dispatch
class ViewController: UIViewController {
    @objc dynamic func viewTapped() {}  // can be swizzled
}

// Force static: final class
final class FastRenderer { func render() { } }</code></pre>`,
  },
  {
    id: "a3",
    number: 3,
    level: "advanced",
    question: "What are Swift property wrappers and give examples of custom ones?",
    answerHTML: `<p>A <strong>property wrapper</strong> adds a layer of separation between how a property is stored and where it's defined. SwiftUI's <code>@State</code>, <code>@Published</code>, <code>@Binding</code> are all property wrappers.</p>
<pre><code>@propertyWrapper
struct Clamped&lt;T: Comparable&gt; {
    private var value: T
    let range: ClosedRange&lt;T&gt;
    init(initialValue: T, _ range: ClosedRange&lt;T&gt;) {
        self.range = range
        self.value = min(max(initialValue, range.lowerBound), range.upperBound)
    }
    var wrappedValue: T {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
}

struct VolumeControl {
    @Clamped(0...100) var volume: Int = 50
}
var c = VolumeControl(); c.volume = 150; print(c.volume)  // 100

// @UserDefault wrapper
@propertyWrapper
struct UserDefault&lt;T&gt; {
    let key: String; let defaultValue: T
    var wrappedValue: T {
        get { UserDefaults.standard.value(forKey: key) as? T ?? defaultValue }
        set { UserDefaults.standard.set(newValue, forKey: key) }
    }
}</code></pre>`,
  },
  {
    id: "a4",
    number: 4,
    level: "advanced",
    question: "How would you architect offline-first capability in an iOS app?",
    answerHTML: `<p>Offline-first means the app works fully without connectivity and syncs when connected. The key pattern is <strong>local-first</strong>:</p>
<ol>
<li><strong>Local DB as single source of truth</strong> — UI always reads from CoreData/Realm, never directly from network.</li>
<li><strong>Background sync</strong> — network layer writes to local DB; UI observes the DB.</li>
<li><strong>Optimistic updates</strong> — apply changes locally immediately, sync in background.</li>
<li><strong>Conflict resolution</strong> — last-write-wins, server-wins, or manual resolution.</li>
</ol>
<pre><code>final class ArticleRepository {
    func fetchArticles() -> AnyPublisher&lt;[Article], Never&gt; {
        localStore.articlesPublisher()  // UI reads from local — instant, offline-safe
    }

    func sync() async {
        guard NetworkMonitor.isConnected else { return }
        let remoteArticles = try? await remoteAPI.fetchAll()
        if let articles = remoteArticles { await localStore.upsert(articles) }
    }
}</code></pre>
<p>Key tools: <strong>CoreData</strong> with <code>NSFetchedResultsController</code> or <strong>SwiftData</strong> (iOS 17+), combined with <code>NWPathMonitor</code>.</p>`,
  },
  {
    id: "a5",
    number: 5,
    level: "advanced",
    question: "How do you optimise UITableView/UICollectionView performance for large data sets?",
    answerHTML: `<ul>
<li><strong>Cell reuse</strong> — always <code>dequeueReusableCell</code>. Never create new cells per row.</li>
<li><strong>Estimated row heights</strong> — <code>estimatedRowHeight</code> avoids pre-calculating all heights.</li>
<li><strong>Async image loading</strong> — never load images on the main thread.</li>
<li><strong>Prefetching</strong> — <code>UITableViewDataSourcePrefetching</code> to load data before cells are needed.</li>
<li><strong>Diffable Data Source</strong> — efficient, animated updates without <code>reloadData()</code>.</li>
</ul>
<pre><code>var dataSource: UITableViewDiffableDataSource&lt;Section, Item&gt;!

func applySnapshot(items: [Item]) {
    var snapshot = NSDiffableDataSourceSnapshot&lt;Section, Item&gt;()
    snapshot.appendSections([.main])
    snapshot.appendItems(items)
    dataSource.apply(snapshot, animatingDifferences: true) // only updates changed rows
}</code></pre>`,
  },
  {
    id: "a6",
    number: 6,
    level: "advanced",
    question: "What is Swift's support for generics and how do you use associated types in protocols?",
    answerHTML: `<p><strong>Generics</strong> write flexible, reusable functions working with any type while maintaining type safety. <strong>Associated types</strong> are placeholder types in protocols determined by the conforming type.</p>
<pre><code>func findMax&lt;T: Comparable&gt;(_ array: [T]) -> T? { array.max() }

protocol Repository {
    associatedtype Entity
    associatedtype ID
    func fetch(id: ID) async throws -> Entity
    func save(_ entity: Entity) async throws
}

struct UserRepository: Repository {
    typealias Entity = User
    typealias ID = UUID
    func fetch(id: UUID) async throws -> User { /* ... */ return User() }
    func save(_ entity: User) async throws { /* ... */ }
}

// Opaque return type
func makeRepository() -> some Repository { UserRepository() }</code></pre>`,
  },
  {
    id: "a7",
    number: 7,
    level: "advanced",
    question: "How does the Swift runtime handle memory layout for value types?",
    answerHTML: `<p>Swift uses <strong>Copy-on-Write (CoW)</strong> for large value types (<code>Array</code>, <code>Dictionary</code>, <code>String</code>) to avoid expensive copies on every assignment. The buffer is only copied when mutated and more than one reference exists.</p>
<pre><code>var a = [1, 2, 3, 4, 5]
var b = a           // NO copy yet — shared buffer
b.append(6)         // NOW copied — b gets its own buffer
print(a.count)  // 5
print(b.count)  // 6

// Implement CoW in custom types
struct MyCollection&lt;T&gt; {
    private var storage: Storage&lt;T&gt;
    mutating func append(_ element: T) {
        if !isKnownUniquelyReferenced(&amp;storage) {
            storage = Storage(storage.data)  // copy only when needed
        }
        storage.data.append(element)
    }
}</code></pre>`,
  },
  {
    id: "a8",
    number: 8,
    level: "advanced",
    question: "How would you implement a thread-safe cache in Swift?",
    answerHTML: `<pre><code>// Approach 1: Actor-based (Swift Concurrency)
actor ImageCache {
    private var cache: [URL: UIImage] = [:]
    func image(for url: URL) -> UIImage? { cache[url] }
    func store(_ image: UIImage, for url: URL) { cache[url] = image }
}

let cache = ImageCache()
await cache.store(image, for: url)

// Approach 2: Concurrent queue with barrier writes (classic)
final class ThreadSafeCache&lt;Key: Hashable, Value&gt; {
    private var cache: [Key: Value] = [:]
    private let queue = DispatchQueue(label: "cache.queue", attributes: .concurrent)

    func get(key: Key) -> Value? { queue.sync { cache[key] } }
    func set(key: Key, value: Value) {
        queue.async(flags: .barrier) { self.cache[key] = value }
    }
}</code></pre>
<p>For images in production, prefer <code>NSCache</code> (auto-evicts under memory pressure) wrapped with an actor.</p>`,
  },
  {
    id: "a9",
    number: 9,
    level: "advanced",
    question: "Explain structured concurrency with TaskGroup in Swift.",
    answerHTML: `<p><strong>TaskGroup</strong> dynamically creates and runs multiple child tasks concurrently, collecting results. It's "structured" — child tasks can't outlive their parent. If the parent is cancelled, all children are cancelled too.</p>
<pre><code>func fetchAllUsers(ids: [UUID]) async throws -> [User] {
    try await withThrowingTaskGroup(of: User.self) { group in
        for id in ids {
            group.addTask { try await fetchUser(id: id) }  // all concurrent
        }
        var users: [User] = []
        for try await user in group { users.append(user) }
        return users
    }
}

// async let — parallel fixed tasks
func loadDashboard() async throws -> Dashboard {
    async let profile = fetchProfile()
    async let orders = fetchOrders()
    async let notifications = fetchNotifications()
    return try await Dashboard(profile: profile, orders: orders, notifications: notifications)
}</code></pre>`,
  },
  {
    id: "a10",
    number: 10,
    level: "advanced",
    question: "How do you diagnose and fix memory leaks in an iOS app?",
    answerHTML: `<p><strong>Tools:</strong> Xcode Memory Graph Debugger (leaked objects show purple icon), Instruments → Leaks, Instruments → Allocations.</p>
<pre><code>// 1. Timer retain cycle
timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
    self.updateUI()       // strong capture — LEAK
}
// Fix
timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
    self?.updateUI()
}

// 2. Delegate not weak
class DataLoader {
    weak var delegate: DataLoaderDelegate?  // always weak
}

// 3. Verify with deinit logging
class ViewModel {
    deinit { print("ViewModel deallocated ✅") }
}</code></pre>
<p>If <code>deinit</code> never prints after dismissing a screen, you have a leak. Start with <code>deinit</code> logging before opening Instruments.</p>`,
  },
];

interface AccordionItemProps {
  item: QAItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  const numClass =
    item.level === "beginner"
      ? "beginner-num"
      : item.level === "intermediate"
      ? "intermediate-num"
      : "advanced-num";

  return (
    <div className="qa-item">
      <button className="qa-question" onClick={onToggle}>
        <span className={`qa-question-number ${numClass}`}>{item.number}</span>
        <span>{item.question}</span>
        <i
          className={`fas fa-chevron-down qa-toggle-icon${isOpen ? " rotated" : ""}`}
        />
      </button>
      <div className={`qa-answer${isOpen ? " open" : ""}`}>
        <div dangerouslySetInnerHTML={{ __html: item.answerHTML }} />
      </div>
    </div>
  );
}

export default function IOSInterviewQuestions() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <style>{`
        .qa-item { border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 20px; overflow: hidden; }
        .qa-question { background: #f8f9fa; padding: 18px 22px; font-weight: 600; font-size: 15px; color: #2d3748; cursor: pointer; display: flex; align-items: flex-start; gap: 12px; border: none; width: 100%; text-align: left; transition: background 0.2s; }
        .qa-question:hover { background: #edf2f7; }
        .qa-question:focus, .qa-question:focus-visible { outline: none; box-shadow: none; }
        .qa-question-number { flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; margin-top: 1px; }
        .beginner-num { background: #10b981; }
        .intermediate-num { background: #3b82f6; }
        .advanced-num { background: #8b5cf6; }
        .qa-answer { padding: 0 22px 0 62px; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.3s ease; }
        .qa-answer.open { max-height: 2000px; padding: 0 22px 20px 62px; }
        .qa-answer p, .qa-answer ul, .qa-answer ol { margin-bottom: 12px; font-size: 14.5px; color: #4a5568; line-height: 1.7; }
        .qa-answer ul, .qa-answer ol { padding-left: 20px; }
        .qa-answer pre { background: #1a202c; color: #e2e8f0; padding: 16px 18px; border-radius: 8px; font-size: 13px; overflow-x: auto; margin-bottom: 14px; }
        .qa-answer code { font-family: 'Fira Code', 'Courier New', monospace; }
        .qa-toggle-icon { margin-left: auto; flex-shrink: 0; transition: transform 0.3s; color: #a0aec0; font-size: 13px; }
        .qa-toggle-icon.rotated { transform: rotate(180deg); }
        .qa-section-label { display: inline-block; padding: 6px 20px; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 28px; }
        .level-beginner { background: #d1fae5; color: #065f46; }
        .level-intermediate { background: #dbeafe; color: #1e40af; }
        .level-advanced { background: #ede9fe; color: #5b21b6; }
        .level-divider { border: none; border-top: 2px dashed #e2e8f0; margin: 48px 0; }
        .quick-stats { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 32px; }
        .quick-stat { flex: 1; min-width: 100px; background: #f8f9fa; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; text-align: center; }
        .quick-stat-value { font-size: 22px; font-weight: 800; color: #007ea7; }
        .quick-stat-label { font-size: 12px; color: #718096; margin-top: 2px; }
      `}</style>
      <BlogLayout
        category="iOS Development"
        date="February 18, 2026"
        readTime="20 min read"
        title="iOS Interview Questions & Answers"
        subtitle="A comprehensive guide covering Beginner, Intermediate, and Advanced iOS interview questions — from Swift basics and memory management to concurrency, architecture patterns, and performance optimization."
      >
        <p>
          Whether you&apos;re preparing for your first iOS role or interviewing
          for a senior architect position, this guide has you covered. I&apos;ve
          compiled the questions I&apos;ve been asked — and the ones I ask —
          across 13+ years of iOS development. Click any question to reveal the
          answer.
        </p>

        <div className="quick-stats">
          {[
            { value: "10", label: "Beginner Q&A" },
            { value: "10", label: "Intermediate Q&A" },
            { value: "10", label: "Advanced Q&A" },
            { value: "30", label: "Total Questions" },
          ].map((s) => (
            <div className="quick-stat" key={s.label}>
              <div className="quick-stat-value">{s.value}</div>
              <div className="quick-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Beginner */}
        <span className="qa-section-label level-beginner">
          <i className="fas fa-seedling" style={{ marginRight: 6 }} />
          Beginner Level
        </span>
        {beginnerQA.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}

        <hr className="level-divider" />

        {/* Intermediate */}
        <span className="qa-section-label level-intermediate">
          <i className="fas fa-code" style={{ marginRight: 6 }} />
          Intermediate Level
        </span>
        {intermediateQA.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}

        <hr className="level-divider" />

        {/* Advanced */}
        <span className="qa-section-label level-advanced">
          <i className="fas fa-rocket" style={{ marginRight: 6 }} />
          Advanced Level
        </span>
        {advancedQA.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}

        <p style={{ marginTop: 32 }}>
          Have a question that&apos;s not covered here? Or want to discuss a
          specific scenario from your interview prep?{" "}
          <a href="/#contact-section">Reach out</a> — happy to help.
        </p>
      </BlogLayout>
    </>
  );
}
