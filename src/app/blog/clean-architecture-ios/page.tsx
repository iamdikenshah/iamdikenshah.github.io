import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "Clean Architecture in iOS — Diken Shah",
  description:
    "A deep-dive into Clean Architecture for iOS apps — layers, dependencies, SOLID principles, and practical Swift examples.",
};

const articleHTML = `
<h2>Why Architecture Matters in iOS</h2>
<p>Every iOS developer has opened a legacy project and seen a <code>ViewController</code> with 2,000 lines of code — API calls, business logic, UI updates, and CoreData queries all tangled together. It works at first. Then it becomes impossible to test, change, or even read.</p>
<p>Clean Architecture, popularised by Robert C. Martin ("Uncle Bob"), solves this by enforcing strict boundaries between concerns. In iOS, applying these principles consistently leads to apps that are testable, scalable, and genuinely maintainable over years — not weeks.</p>

<h2>The Core Idea: The Dependency Rule</h2>
<p>Clean Architecture is built around one non-negotiable rule:</p>
<blockquote style="border-left:4px solid #007ea7;padding:16px 24px;margin:24px 0;background:#f0f7fa;border-radius:0 8px 8px 0;font-style:italic;color:#2d3748;">
  "Source code dependencies must only point inward. Nothing in an inner circle can know anything at all about something in an outer circle."
</blockquote>
<p>In practice this means your business logic never imports UIKit. Your data layer never leaks into your domain. The layers are:</p>
<div style="background:#f8f9fa;border-radius:12px;padding:24px;margin:24px 0;border:1px solid #e2e8f0;text-align:center;">
  <div style="margin-bottom:8px;"><span style="display:inline-block;padding:10px 32px;background:#007ea7;color:white;border-radius:50px;font-weight:600;font-size:15px;">Presentation Layer</span></div>
  <div style="color:#a0aec0;font-size:20px;margin-bottom:8px;">↓</div>
  <div style="margin-bottom:8px;"><span style="display:inline-block;padding:10px 48px;background:#00a0d2;color:white;border-radius:50px;font-weight:600;font-size:15px;">Domain Layer</span></div>
  <div style="color:#a0aec0;font-size:20px;margin-bottom:8px;">↓</div>
  <div><span style="display:inline-block;padding:10px 44px;background:#4ade80;color:#1a202c;border-radius:50px;font-weight:600;font-size:15px;">Data Layer</span></div>
</div>

<h2>The Three Layers in iOS</h2>

<h3>1. Domain Layer — The Heart of Your App</h3>
<p>This is the innermost layer. It contains your business logic and has <strong>zero dependencies</strong> on any framework — no UIKit, no Foundation networking, no CoreData. Just pure Swift.</p>
<p>The Domain Layer contains:</p>
<ul>
  <li><strong>Entities</strong> — Plain Swift structs/classes that represent your business objects</li>
  <li><strong>Use Cases (Interactors)</strong> — Each one encapsulates a single piece of business logic</li>
  <li><strong>Repository Interfaces</strong> — Protocols that define <em>what</em> data operations are needed (not <em>how</em>)</li>
</ul>
<pre><code>// Entity — pure Swift, no imports needed
struct User {
    let id: UUID
    let name: String
    let email: String
    let isPremium: Bool
}

// Repository Interface — a protocol, not an implementation
protocol UserRepository {
    func fetchUser(id: UUID) async throws -> User
    func saveUser(_ user: User) async throws
}

// Use Case — single responsibility
final class FetchUserProfileUseCase {
    private let repository: UserRepository

    init(repository: UserRepository) {
        self.repository = repository
    }

    func execute(userId: UUID) async throws -> User {
        let user = try await repository.fetchUser(id: userId)
        return user
    }
}</code></pre>

<h3>2. Data Layer — Implements the Contracts</h3>
<p>The Data Layer implements the repository protocols defined in the Domain Layer. It deals with all the messy details: networking, CoreData, caching, UserDefaults.</p>
<pre><code>// DTO — data transfer object from the API
struct UserDTO: Decodable {
    let id: String
    let fullName: String
    let emailAddress: String
    let subscriptionTier: String
}

extension UserDTO {
    func toDomain() -> User {
        User(
            id: UUID(uuidString: id) ?? UUID(),
            name: fullName,
            email: emailAddress,
            isPremium: subscriptionTier == "premium"
        )
    }
}

final class DefaultUserRepository: UserRepository {
    private let apiService: APIService
    private let localCache: UserCache

    func fetchUser(id: UUID) async throws -> User {
        if let cached = localCache.get(id: id) { return cached }
        let dto: UserDTO = try await apiService.get("/users/\(id.uuidString)")
        let user = dto.toDomain()
        localCache.set(user)
        return user
    }
}</code></pre>

<h3>3. Presentation Layer — UI and ViewModels</h3>
<p>The Presentation Layer handles everything the user sees. It communicates with the Domain Layer via Use Cases — never directly with repositories or data sources.</p>
<pre><code>@MainActor
final class UserProfileViewModel: ObservableObject {
    @Published var user: User?
    @Published var isLoading = false
    @Published var errorMessage: String?

    private let fetchUserUseCase: FetchUserProfileUseCase

    init(fetchUserUseCase: FetchUserProfileUseCase) {
        self.fetchUserUseCase = fetchUserUseCase
    }

    func loadProfile(userId: UUID) {
        isLoading = true
        Task {
            do {
                user = try await fetchUserUseCase.execute(userId: userId)
            } catch {
                errorMessage = error.localizedDescription
            }
            isLoading = false
        }
    }
}</code></pre>

<h2>Dependency Injection — The Glue</h2>
<pre><code>final class AppDIContainer {
    lazy var apiService: APIService = DefaultAPIService()
    lazy var userCache: UserCache = InMemoryUserCache()
    lazy var userRepository: UserRepository = DefaultUserRepository(
        apiService: apiService, localCache: userCache
    )
    lazy var fetchUserUseCase = FetchUserProfileUseCase(repository: userRepository)

    func makeUserProfileViewModel() -> UserProfileViewModel {
        UserProfileViewModel(fetchUserUseCase: fetchUserUseCase)
    }
}</code></pre>

<h2>Testing — Where Clean Architecture Pays Off</h2>
<pre><code>final class MockUserRepository: UserRepository {
    var mockUser: User?
    var shouldThrow = false

    func fetchUser(id: UUID) async throws -> User {
        if shouldThrow { throw URLError(.badServerResponse) }
        return mockUser ?? User(id: id, name: "Test", email: "t@t.com", isPremium: false)
    }
    func saveUser(_ user: User) async throws {}
}

final class FetchUserProfileUseCaseTests: XCTestCase {
    func testFetchUserSuccess() async throws {
        let mock = MockUserRepository()
        mock.mockUser = User(id: UUID(), name: "Diken", email: "shah.diken@gmail.com", isPremium: true)
        let useCase = FetchUserProfileUseCase(repository: mock)
        let user = try await useCase.execute(userId: UUID())
        XCTAssertEqual(user.name, "Diken")
        XCTAssertTrue(user.isPremium)
    }
}</code></pre>

<h2>Folder Structure</h2>
<pre><code>MyApp/
├── Domain/
│   ├── Entities/User.swift
│   ├── UseCases/FetchUserProfileUseCase.swift
│   └── Repositories/UserRepository.swift     ← Protocol only
├── Data/
│   ├── Repositories/DefaultUserRepository.swift
│   ├── Network/DTOs/UserDTO.swift
│   └── Cache/InMemoryUserCache.swift
├── Presentation/
│   └── UserProfile/
│       ├── UserProfileView.swift
│       └── UserProfileViewModel.swift
└── App/
    ├── AppDIContainer.swift
    └── MyApp.swift</code></pre>

<h2>Common Mistakes to Avoid</h2>
<ul>
  <li><strong>Putting business logic in the ViewModel.</strong> ViewModels orchestrate; Use Cases contain logic.</li>
  <li><strong>Breaking the Dependency Rule.</strong> If your Domain layer ever imports UIKit, you've broken the architecture.</li>
  <li><strong>One Use Case doing everything.</strong> Use Cases should be small and single-purpose.</li>
  <li><strong>Skipping mappers.</strong> Always map DTOs to Domain Entities at the boundary.</li>
  <li><strong>Over-engineering small apps.</strong> Clean Architecture shines in medium-to-large apps. Use good judgment.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
  <li>The Dependency Rule: inner layers never know about outer layers. Domain Layer has zero external imports.</li>
  <li>Use Cases are the unit of business logic — one responsibility each.</li>
  <li>Repository protocols live in Domain; implementations live in Data.</li>
  <li>ViewModels call Use Cases — they don't talk to repositories or network layers directly.</li>
  <li>Dependency injection wires it all together at startup.</li>
  <li>The payoff is effortless testing, safe refactoring, and code you can still read in 3 years.</li>
</ul>
<p>I've shipped banking apps, healthcare platforms, and e-commerce products using these principles. If you want to discuss how to apply Clean Architecture to your specific project, feel free to <a href="/#contact-section">reach out</a>.</p>
`;

export default function CleanArchitectureiOS() {
  return (
    <BlogLayout
      category="iOS Development"
      date="February 18, 2026"
      readTime="12 min read"
      title="Clean Architecture in iOS"
      subtitle="A practical deep-dive into building scalable, testable, and maintainable iOS apps using Clean Architecture — with real Swift code, clear layer boundaries, and lessons from 13+ years of production apps."
    >
      <div dangerouslySetInnerHTML={{ __html: articleHTML }} />
    </BlogLayout>
  );
}
