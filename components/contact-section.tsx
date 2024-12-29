import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="min-h-screen bg-background px-4 flex flex-col items-center justify-between">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md bg-gray-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-black mb-6">Contact Me</h2>
          <p className="text-lg text-gray-600 mb-6">
            Feel free to reach out via email or connect with me on LinkedIn and GitHub!
          </p>
          <div className="space-y-4">
            <a
              href="mailto:dillionlim2004@gmail.com"
              className="flex items-center justify-center text-lg text-blue-600 hover:text-blue-800"
            >
              <FaEnvelope className="mr-3" /> Email (dillionlim2004@gmail.com)
            </a>
            <a
              href="https://linkedin.com/in/dillion-lim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-lg text-blue-600 hover:text-blue-800"
            >
              <FaLinkedin className="mr-3" /> LinkedIn
            </a>
            <a
              href="https://github.com/dillionlim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-lg text-blue-600 hover:text-blue-800"
            >
              <FaGithub className="mr-3" /> GitHub
            </a>
          </div>
        </div>
      </div>
      <footer className="py-4 text-gray-600 text-center">
        &copy; {currentYear} Lim Dillion
      </footer>
    </section>
  );
}
