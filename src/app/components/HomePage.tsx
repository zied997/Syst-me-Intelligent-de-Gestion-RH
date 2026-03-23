import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Brain, UserCircle, ShieldCheck, ArrowRight, TrendingUp, Users, Clock, Award, Sparkles, Zap, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onSelectUserType: (type: 'manager' | 'employee') => void;
}

export function HomePage({ onSelectUserType }: HomePageProps) {
  const [hoveredCard, setHoveredCard] = useState<'manager' | 'employee' | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: '98%', label: 'Précision IA', icon: Brain, color: 'text-purple-600' },
    { value: '-35%', label: 'Turnover réduit', icon: TrendingUp, color: 'text-green-600' },
    { value: '24/7', label: 'Disponibilité', icon: Clock, color: 'text-blue-600' },
    { value: '+47%', label: 'Productivité', icon: Award, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Animated Logo */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
              <Brain className="w-14 h-14 text-white animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Système Intelligent
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              de Gestion RH
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Révolutionnez la gestion de vos ressources humaines avec l'intelligence artificielle et le Business Intelligence.
            Anticipez, analysez et optimisez en temps réel.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Manager Card */}
          <div
            className={`transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
            onMouseEnter={() => setHoveredCard('manager')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Card className={`
              relative overflow-hidden cursor-pointer group transition-all duration-500
              hover:shadow-2xl hover:-translate-y-2
              ${hoveredCard === 'manager' ? 'shadow-2xl -translate-y-2 border-blue-500' : 'border-gray-200'}
            `}>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
              
              <CardHeader className="relative text-center pb-6">
                <div className="flex justify-center mb-6">
                  <div className={`
                    relative p-5 rounded-2xl transition-all duration-500
                    bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl
                    group-hover:shadow-2xl group-hover:scale-110
                  `}>
                    <ShieldCheck className="w-14 h-14 text-white" />
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Gestionnaire RH
                </CardTitle>
                <CardDescription className="text-base">
                  Accès complet au tableau de bord analytique et prédictif
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <ul className="space-y-4 mb-8">
                  {[
                    'Analyse des données RH avec IA prédictive',
                    'Prédiction du turnover et absentéisme',
                    'Détection automatique des risques',
                    'Rapports BI et visualisations avancées',
                    'Tableaux de bord personnalisables'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-700 group/item">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center group-hover/item:bg-blue-200 transition-colors">
                          <ChevronRight className="w-3 h-3 text-blue-600" />
                        </div>
                      </div>
                      <span className="group-hover/item:text-gray-900 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => onSelectUserType('manager')}
                >
                  <span>Accéder au portail Manager</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Employee Card */}
          <div
            className={`transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
            onMouseEnter={() => setHoveredCard('employee')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Card className={`
              relative overflow-hidden cursor-pointer group transition-all duration-500
              hover:shadow-2xl hover:-translate-y-2
              ${hoveredCard === 'employee' ? 'shadow-2xl -translate-y-2 border-green-500' : 'border-gray-200'}
            `}>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all duration-500"></div>
              
              <CardHeader className="relative text-center pb-6">
                <div className="flex justify-center mb-6">
                  <div className={`
                    relative p-5 rounded-2xl transition-all duration-500
                    bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl
                    group-hover:shadow-2xl group-hover:scale-110
                  `}>
                    <UserCircle className="w-14 h-14 text-white" />
                    <Zap className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Employé
                </CardTitle>
                <CardDescription className="text-base">
                  Gestion de présence et suivi des performances
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <ul className="space-y-4 mb-8">
                  {[
                    'Pointage d\'arrivée et de départ',
                    'Historique complet de présence',
                    'Compteur d\'absences et retards',
                    'Taux de présence personnalisé',
                    'Statistiques et objectifs'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-700 group/item">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                          <ChevronRight className="w-3 h-3 text-green-600" />
                        </div>
                      </div>
                      <span className="group-hover/item:text-gray-900 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => onSelectUserType('employee')}
                >
                  <span>Accéder au portail Employé</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Technologies de pointe
            </h2>
            <p className="text-gray-600">
              Une solution complète combinant les meilleures technologies
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { emoji: '🐍', name: 'Python', desc: 'Traitement IA', gradient: 'from-blue-500 to-cyan-500' },
              { emoji: '🧠', name: 'Plugins IA', desc: 'Prédictions', gradient: 'from-purple-500 to-pink-500' },
              { emoji: '📊', name: 'Power BI', desc: 'Visualisations', gradient: 'from-yellow-500 to-orange-500' },
              { emoji: '⚛️', name: 'React', desc: 'Interface Web', gradient: 'from-cyan-500 to-blue-500' },
              { emoji: '📈', name: 'Excel', desc: 'Import données', gradient: 'from-green-500 to-emerald-500' },
            ].map((tech, index) => (
              <div
                key={index}
                className="group relative text-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${tech.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {tech.emoji}
                </div>
                <p className="text-sm font-semibold text-gray-800">{tech.name}</p>
                <p className="text-xs text-gray-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Données anonymisées et conformes RGPD</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Système RH Intelligent - Tous droits réservés</p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}