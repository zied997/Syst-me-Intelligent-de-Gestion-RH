import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Brain, ShieldCheck, TrendingUp, Users, Clock, Award, ChevronRight, BarChart3, Sparkles } from 'lucide-react';

interface HomePageProps {
  onSelectUserType: (type: 'manager' | 'employee') => void;
}

export function HomePage({ onSelectUserType }: HomePageProps) {
  const stats = [
    { value: '98%', label: 'Précision IA', icon: Brain, color: '#3b82f6' },
    { value: '-35%', label: 'Turnover réduit', icon: TrendingUp, color: '#10b981' },
    { value: '24/7', label: 'Disponibilité', icon: Clock, color: '#8b5cf6' },
    { value: '+47%', label: 'Productivité', icon: Award, color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Intelligence Artificielle & BI</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Système Intelligent
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                de Gestion RH
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Anticipez, analysez et optimisez vos ressources humaines grâce à l'IA et au Business Intelligence
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex justify-center mb-3">
                      <Icon className="w-8 h-8" style={{ color: stat.color }} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            
            <CardHeader className="relative text-center pt-12 pb-6">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative p-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl">
                    <ShieldCheck className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                Gestionnaire RH
              </CardTitle>
              <CardDescription className="text-base text-gray-500">
                Accès complet au tableau de bord analytique et prédictif
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative pb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Analyse des données RH avec IA prédictive',
                  'Prédiction du turnover et absentéisme',
                  'Détection automatique des risques',
                  'Rapports BI et visualisations avancées',
                  'Tableaux de bord personnalisables',
                  'Alertes et notifications en temps réel'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <ChevronRight className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => onSelectUserType('manager')}
              >
                <span>Accéder au portail Manager</span>
                <BarChart3 className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technology Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technologies de pointe
            </h2>
            <p className="text-lg text-gray-600">
              Une infrastructure robuste pour des analyses précises
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { emoji: '🐍', name: 'Python', desc: 'Machine Learning', color: 'from-blue-500 to-cyan-500' },
              { emoji: '🧠', name: 'TensorFlow', desc: 'Deep Learning', color: 'from-purple-500 to-pink-500' },
              { emoji: '📊', name: 'Power BI', desc: 'Visualisation', color: 'from-yellow-500 to-orange-500' },
              { emoji: '⚛️', name: 'React', desc: 'Interface Web', color: 'from-cyan-500 to-blue-500' },
              { emoji: '🗄️', name: 'MySQL', desc: 'Base de données', color: 'from-green-500 to-emerald-500' },
            ].map((tech, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {tech.emoji}
                </div>
                <p className="font-semibold text-gray-800 mb-1">{tech.name}</p>
                <p className="text-xs text-gray-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400" />
              <span className="font-semibold text-lg">HR Intelligence System</span>
            </div>
            <div className="text-center text-sm text-gray-400">
              <p>© 2026 Système RH Intelligent - Données anonymisées et conformes RGPD</p>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Système opérationnel</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}