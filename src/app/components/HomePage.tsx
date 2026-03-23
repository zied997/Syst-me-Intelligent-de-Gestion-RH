import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Brain, UserCircle, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onSelectUserType: (type: 'manager' | 'employee') => void;
}

export function HomePage({ onSelectUserType }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">
            Système Intelligent de Gestion RH
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Solution complète de Business Intelligence et Intelligence Artificielle pour la gestion 
            des ressources humaines et le suivi des présences
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Manager Card */}
          <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-2 hover:border-blue-500" onClick={() => onSelectUserType('manager')}>
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <ShieldCheck className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Gestionnaire RH</CardTitle>
              <CardDescription className="text-base mt-2">
                Accès au tableau de bord analytique complet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Analyse des données RH avec IA
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Prédiction du turnover et absentéisme
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Détection des risques et surcharges
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Rapports et visualisations BI
                </li>
              </ul>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => onSelectUserType('manager')}
              >
                Accéder au portail Manager
              </Button>
            </CardContent>
          </Card>

          {/* Employee Card */}
          <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-2 hover:border-green-500" onClick={() => onSelectUserType('employee')}>
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <UserCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Employé</CardTitle>
              <CardDescription className="text-base mt-2">
                Gestion de présence et statistiques personnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Pointage d'arrivée et de départ
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Historique de présence
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Compteur d'absences et retards
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Taux de présence personnel
                </li>
              </ul>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => onSelectUserType('employee')}
              >
                Accéder au portail Employé
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Technologies utilisées
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🐍</div>
              <p className="text-sm font-medium text-gray-700">Python</p>
              <p className="text-xs text-gray-500">Traitement IA</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🧠</div>
              <p className="text-sm font-medium text-gray-700">Plugins IA</p>
              <p className="text-xs text-gray-500">Prédictions</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm font-medium text-gray-700">Power BI</p>
              <p className="text-xs text-gray-500">Visualisations</p>
            </div>
            <div>
              <div className="text-2xl mb-2">⚛️</div>
              <p className="text-sm font-medium text-gray-700">React</p>
              <p className="text-xs text-gray-500">Interface Web</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📈</div>
              <p className="text-sm font-medium text-gray-700">Excel</p>
              <p className="text-xs text-gray-500">Import données</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2026 Système RH Intelligent - Données anonymisées et conformes RGPD</p>
        </div>
      </div>
    </div>
  );
}
