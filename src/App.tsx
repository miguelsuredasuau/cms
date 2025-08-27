import React, { useState } from 'react';
import { ChevronRight, Sparkles, Users, Eye } from 'lucide-react';

interface NavigationItem {
  id: string;
  title: string;
  isActive?: boolean;
  isPhase?: boolean;
  phaseNumber?: number;
}

const navigationItems: NavigationItem[] = [
  { id: 'phase1', title: 'PHASE 1: LAY THE FOUNDATION', isPhase: true, phaseNumber: 1 },
  { id: 'plan', title: '1. Plan before you prompt', isActive: true },
  { id: 'map', title: '2. Map the User Journey Visually' },
  { id: 'design', title: '3. Get the Design Right First' },
  { id: 'phase2', title: 'PHASE 2: THINK IN SYSTEMS', isPhase: true, phaseNumber: 2 },
  { id: 'component', title: '4. Prompt by Component, Not Page' },
  { id: 'content', title: '5. Design with Real Content' },
  { id: 'atomic', title: '6. Speak Atomic: Buttons, Cards, Modals' },
  { id: 'buzzwords', title: '7. Use Buzzwords to Dial In Aesthetic' },
  { id: 'phase3', title: 'PHASE 3: BUILD WITH PRECISION', isPhase: true, phaseNumber: 3 },
  { id: 'hierarchy', title: '8. Use Clear Hierarchy in Prompts' },
  { id: 'visuals', title: '9. Add visuals via URL' },
  { id: 'edit', title: '10. Use the Edit Button Strategically' },
  { id: 'phase4', title: 'PHASE 4: ITERATE AND SHIP', isPhase: true, phaseNumber: 4 },
  { id: 'supabase', title: '11. Build with Supabase in Mind' },
  { id: 'version', title: '12. Version Control is your friend' },
];

function App() {
  const [selectedItem, setSelectedItem] = useState('plan');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Mastering Lovable</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Try Lovable for free
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              Follow for more
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
          <div className="p-6">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  {item.isPhase ? (
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-6 mb-3">
                      {item.title}
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedItem(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        item.isActive || selectedItem === item.id
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.title}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Hero Section */}
          <div className="relative">
            <div className="h-64 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-2xl mx-6 mt-6 mb-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-12">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Phase 1: Lay the Foundation
              </h2>

              <div className="space-y-12">
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    1. Plan before you prompt
                  </h3>
                  
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Before using Lovable, define what you're building. Skipping this step is like starting a painting 
                      without deciding what you're painting. Use a quick planning session—pen and paper, voice notes, 
                      ChatGPT, whatever works—to answer these four questions:
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">What is this product or feature?</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">Who is it for?</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">Why will they use it?</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">What is the one key action the user should take?</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      You're not writing a spec doc. You're setting direction. The more aligned your thinking, the 
                      sharper your prompts. Vague ideas produce vague outputs. Clear thinking leads to clear results.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Prompt Example:</h4>
                      <p className="text-blue-800 leading-relaxed">
                        "Build a task management app for freelancers who juggle multiple clients. The main action is 
                        creating and organizing tasks by client. Include a clean dashboard, task creation form, and 
                        client categorization. Use a modern, professional design with blue and gray colors."
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    2. Map the User Journey Visually
                  </h3>
                  
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Before jumping into design, sketch out the user flow. This doesn't need to be fancy—even a simple 
                      flowchart helps you understand the sequence of screens and actions.
                    </p>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <Eye className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-semibold text-yellow-900">Pro Tip:</span>
                      </div>
                      <p className="text-yellow-800">
                        Think in terms of user stories: "As a user, I want to..." This helps you focus on actual 
                        user needs rather than getting lost in technical details.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    3. Get the Design Right First
                  </h3>
                  
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Design is not decoration—it's how your product works. Before writing any code, establish your 
                      visual hierarchy, color palette, and key interactions. This foundation will guide every 
                      subsequent decision.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                          <Sparkles className="w-6 h-6 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Visual Hierarchy</h4>
                        <p className="text-gray-600 text-sm">
                          Establish clear information architecture before adding content
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Color System</h4>
                        <p className="text-gray-600 text-sm">
                          Choose a cohesive palette that supports your brand and usability
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                          <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">User Flow</h4>
                        <p className="text-gray-600 text-sm">
                          Map out key interactions and state changes
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;