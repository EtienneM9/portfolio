import React, { useEffect, useState } from 'react';
import { Download, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { LanguageProvider, LanguageSwitcher, useLanguage } from './language-switcher';
import { translations, interests, skills, projects, education } from './translation';

function App() {
  const { language } = useLanguage() as { language: 'fr' | 'en' };
  const [activeInterest, setActiveInterest] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

        // Simule un chargement initial
        setTimeout(() => {
          setLoading(false);
        }, 2000);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          // Réactive les animations quand l'élément sort du viewport
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleInterest = (title: string) => {
    setActiveInterest(activeInterest === title ? null : title);
  };

  return (

    <>
      <div className={`loader-container ${!loading ? 'hidden' : ''}`}>
        <div className="loader">
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
        </div>
      </div>

      <LanguageSwitcher />

      <div className="min-h-screen text-gray-100">
        {/* Header/Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative px-4 py-16 bg-black bg-opacity-40 backdrop-blur-sm md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 fade-in-down">
              <div className="text-center px-4 sm:px-6 lg:px-8">
                <img
                  src="/assets/pp.jpg"
                  alt="Profile"
                  className="w-32 h-32 sm:w-48 sm:h-48 rounded-full mx-auto mb-6 border-4 border-violet-500 shadow-lg"
                />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Étienne</h1>
                <h2 className="text-lg sm:text-xl md:text-2xl text-blue-400 mb-6">
                  {translations[language].title}
                </h2>
              </div>
              
              <div className="mb-8">
                <p className="text-gray-100 mb-6 max-w-2xl mx-auto text-center text-sm sm:text-base md:text-lg">
                  {translations[language].about}
                </p>
                <p className="text-gray-100 mb-6 max-w-2xl mx-auto text-center">
                  {translations[language].looking}
                </p>
                <h3 className="text-xl font-bold mb-12 text-center fade-in-up">
                  {translations[language].interests}:
                </h3>
                {/* Les intérêts */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
                  {interests.map((interest) => (
                    <button
                      key={interest.title}
                      onClick={() => toggleInterest(interest.title)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeInterest === interest.title
                          ? 'bg-violet-500 text-white'
                          : 'bg-black bg-opacity-50 hover:bg-blue-500 hover:text-white'
                      }`}
                    >
                      {language === 'fr' ? interest.title : interest.titleEn}
                    </button>
                  ))}
                </div>

                {activeInterest && (
                  <div className="interest-description active mb-6">
                    <p className="text-center max-w-2xl mx-auto bg-black bg-opacity-50 p-4 rounded-lg">
                      {language === 'fr' 
                        ? interests.find(i => i.title === activeInterest)?.description
                        : interests.find(i => i.title === activeInterest)?.descriptionEn}
                    </p>

                    {/* Affichage du bouton Strava seulement pour "sport" */}
                    {activeInterest === "Sport" && (
                      <div className="flex justify-center mt-4">
                        <a 
                          href="https://www.strava.com/athletes/38491897" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 bg-black bg-opacity-50 hover:bg-violet-500 hover:bg-opacity-30 rounded-lg transition-colors transition"
                        >
                          <img src="/assets/strava-icon.svg" alt="Pour les sportifs ;)" className="w-6 h-6" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-center gap-2 sm:gap-4">
                  <a href="public/assets/cv.pdf" download="cvEtienneMoussa.pdf" className="flex items-center gap-2 bg-violet-500 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors">
                    <Download size={20} />
                    {translations[language].downloadCV}
                  </a>
                  <div className="flex gap-4">
                    <a href="https://github.com/EtienneM9" target="_blank" rel="noopener noreferrer" className="p-3 bg-black bg-opacity-50 hover:bg-violet-500 hover:bg-opacity-30 rounded-lg transition-colors">
                      <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/etienne-moussa-67b246276/" target="_blank" rel="noopener noreferrer" className="p-3 bg-black bg-opacity-50 hover:bg-violet-500 hover:bg-opacity-30 rounded-lg transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href="mailto:etiennemoussa55@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-black bg-opacity-50 hover:bg-violet-500 hover:bg-opacity-30 rounded-lg transition-colors">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-10 px-4 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center fade-in-up">
              {translations[language].skills}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name} 
                  className="fade-in-up bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-xl hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-1 border border-violet-500 border-opacity-20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">
                    {language === 'fr' ? skill.nameFr : skill.name}
                  </h3>
                  <p className="text-gray-100">
                    {language === 'fr' ? skill.descriptionFr : skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-10 px-4 sm:py-20 bg-black bg-opacity-30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center fade-in-up">
              {translations[language].projects}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.name} 
                  className="project-card h-64 fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="project-card-inner h-full">
                    <div className="project-card-front bg-black bg-opacity-50 p-6 flex flex-col justify-center items-center">
                      <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                        {language === 'fr' ? project.nameFr : project.name}
                      </h3>
                      <p className="text-gray-100">
                        {language === 'fr' ? project.descriptionFr : project.description}
                      </p>
                    </div>
                    <div className="project-card-back bg-violet-900 bg-opacity-90 p-6 flex flex-col justify-center items-center">
                      <div className="space-y-4">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-black bg-opacity-50 rounded-lg hover:bg-blue-500 transition-colors"
                        >
                          <Github size={20} />
                          {translations[language].sourceCode}
                        </a>
                        <a 
                          href={project.demo}
                          className="flex items-center gap-2 px-6 py-3 bg-black bg-opacity-50 rounded-lg hover:bg-blue-500 transition-colors"
                        >
                          <ExternalLink size={20} />
                          {translations[language].liveDemo}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-10 px-4 sm:py-20 bg-black bg-opacity-30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center fade-in-up">
              {translations[language].education}
            </h2>
            <div className="timeline relative">
              {/* Timeline connector - background line that runs through the whole timeline */}
              <div className="hidden sm:block absolute h-full w-0.5 bg-violet-500 opacity-30 left-1/2 transform -translate-x-1/2 top-0 z-0"></div>
              
              {education.map((edu, index) => (
                <div key={edu.degree} className="timeline-item relative mb-8">
                  {/* Timeline dot - visible only on sm screens and up */}
                  <div 
                    className="hidden sm:block absolute w-4 h-4 rounded-full z-10 left-1/2 transform -translate-x-1/2 top-6"
                    style={{
                      background: `${index % 3 === 0 ? '#8B5CF6' : index % 3 === 1 ? '#3B82F6' : '#9333EA'}`
                    }}
                  />
                  
                  {/* Content container - responsive layout */}
                  <div 
                    className={`w-full sm:w-5/12 z-20 relative ${
                      index % 2 === 0 
                        ? 'sm:ml-0 sm:mr-auto sm:pr-8 fade-in-left' 
                        : 'sm:ml-auto sm:mr-0 sm:pl-8 fade-in-right'
                    }`}
                  >
                    <div className="bg-black bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition-all duration-300 border border-blue-500 border-opacity-20">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">
                          {language === 'fr' ? edu.degreeFr : edu.degree}
                        </h3>
                        <span className="text-blue-400 mt-2 sm:mt-0">
                          {language === 'fr' ? edu.yearFr : edu.year}
                        </span>
                      </div>
                      <p className="text-gray-100">
                        {language === 'fr' ? edu.schoolFr : edu.school}
                      </p>
                      {edu.description && (
                        <p className="text-gray-300 mt-2 text-sm">
                          {language === 'fr' ? edu.descriptionFr : edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

    </>
  );
}

export default App;
