# Daško i Mlađa Player

Daško i Mlađa Player is a desktop application built with Tauri, SvelteKit, and TypeScript. It plays Daško i Mlađa's live radio and podcast episodes.

## Features

- **Fetch Podcast Feeds:** Retrieve and display podcast feeds from your preferred sources.
- **Responsive UI:** Built with SvelteKit for a dynamic and responsive user experience.
- **Cross-Platform:** Compatible with Windows, macOS, and Linux.
- **Secure:** Utilizes Tauri for enhanced security and performance.
- **TypeScript Support:** Ensures type safety and scalability in the codebase.

## Technologies Used

- **[Tauri](https://tauri.app/):** Build smaller, faster, and more secure desktop applications with a web frontend.
- **[SvelteKit](https://kit.svelte.dev/):** A framework for building fast, optimized web applications.
- **[TypeScript](https://www.typescriptlang.org/):** Adds static typing to JavaScript for improved developer experience.
- **[Vite](https://vitejs.dev/):** Next-generation frontend tooling for a faster and leaner development experience.
- **[Rust](https://www.rust-lang.org/):** Systems programming language focused on safety and performance.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Node.js:** Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **Rust:** Install Rust for building the backend. [Install Rust](https://www.rust-lang.org/tools/install)
- **Tauri CLI:** Install Tauri's command-line interface.

```bash
bash
cargo install tauri-cli
```

### Installation

1. Clone the repository

```bash
bash
git clone https://github.com/yourusername/dasko-i-mladja.git
cd dasko-i-mladja
```

2. Insttall dependencies

```bash
bash
npm install
```

3. Run the Development Server

```bash
bash
npm run tauri dev
```

This will start both the frontend development server and the Tauri backend, allowing you to see changes in real-time.

### Building for Production

To build the application for production, run:

```bash
bash
npm run tauri build
```

The executable will be located in the src-tauri/target/release directory.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features, bug fixes, or enhancements.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact

For any inquiries or support, please contact me at darko@quz.ma
