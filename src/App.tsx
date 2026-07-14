import { Routes, Route } from "react-router";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/ui/cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Home from "@/pages/home";
import Solutions from "@/pages/solutions";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Industries from "@/pages/industries";
import Process from "@/pages/process";
import About from "@/pages/about";
import Insights from "@/pages/insights";
import InsightDetail from "@/pages/insight-detail";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>
      <Cursor />
      <SmoothScroll>
        <Navbar />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/process" element={<Process />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
