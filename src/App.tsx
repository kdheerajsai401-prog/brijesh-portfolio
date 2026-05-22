import HeroSection from './sections/HeroSection';
import GallerySection from './sections/GallerySection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import Pointer from './components/Pointer';

export default function App() {
  return (
    <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <HeroSection />
      <GallerySection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <Pointer />
    </main>
  );
}
