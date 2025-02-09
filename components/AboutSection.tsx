export const AboutSection = () => (
    <div className="mt-16">
        <div id="about" className="mb-12 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">About GalactIQ</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-200">Overview</h3>
                    <p className="text-slate-300">
                        GalacticIQ is a conversational AI chatbot for space data, developed by Team SpaceZ. Our platform provides quick, reliable answers to space-related queries, making space data more accessible to researchers, educators, and the general public.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-200">Use Cases</h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                        <li><span className="font-semibold">Researchers:</span> Access and analyze research papers on topics like dark matter, space missions, and astrophysics</li>
                        <li><span className="font-semibold">Educators:</span> Get simplified explanations and create engaging space-related educational content</li>
                        <li><span className="font-semibold">Students:</span> Learn about space concepts through grade-appropriate explanations</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-200">Key Features</h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                        <li>Natural Language Processing for conversational interactions</li>
                        <li>Easy consumption of space mission details</li>
                        <li>Multi-source data integration (LLM, NASA, and journals)</li>
                        <li>Customizable experience for research and education</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-200">Technical Stack</h3>
                    <p className="text-slate-300">
                        Built with Next.js, Python, and powered by ChatGPT and Crew AI framework. Deployed on Vercel and GCP for optimal performance and reliability.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-200">Team SpaceZ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-slate-300 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-indigo-400">
                                <img src="/team/priti.png" alt="Priti Solanki" className="w-full h-full object-cover" />
                            </div>
                            <p className="font-semibold">Priti Solanki</p>
                            <p className="text-sm">Team Lead</p>
                            <a href="https://github.com/pritisolanki" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm">@pritisolanki</a>
                        </div>
                        <div className="text-slate-300 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-indigo-400">
                                <img src="/team/vishal.png" alt="Vishal Kumar" className="w-full h-full object-cover" />
                            </div>
                            <p className="font-semibold">Vishal Kumar</p>
                            <p className="text-sm">Software Development Engineer</p>
                            <a href="https://github.com/vishalx360" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm">@vishalx360</a>
                        </div>
                        <div className="text-slate-300 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-indigo-400">
                                <img src="/team/shamas.jpeg" alt="Shamas Liaqat" className="w-full h-full object-cover" />
                            </div>
                            <p className="font-semibold">Shamas Liaqat</p>
                            <p className="text-sm">Generative AI Engineer</p>
                            <a href="https://github.com/Shamas245" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm">@Shamas245</a>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-200">Project Links</h3>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://lablab.ai/event/aistronauts-space-agents-on-a-mission/spacez"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
                        >
                            <span>Project Page</span>
                        </a>
                        <a
                            href="https://github.com/pritisolanki/spacez_crew"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
                        >
                            <span>Backend Repository (Crew AI)</span>
                        </a>
                        <a
                            href="https://github.com/kumarvishalben/galact-iq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
                        >
                            <span>Frontend Repository (Next.js)</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
) 