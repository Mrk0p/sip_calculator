import React, { useState, useEffect } from 'react';
import { Calculator, IndianRupee, TrendingUp, Clock, Wallet, LogIn, Heart } from 'lucide-react';
import { supabase } from './supabase';
import { AuthModal } from './components/AuthModal';
import { DonationModal } from './components/DonationModal';
import Footer from './components/footer';

interface YearlyBreakdown {
  year: number;
  invested: number;
  returns: number;
  totalValue: number;
}

function App() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [years, setYears] = useState<number>(5);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [startingBalance, setStartingBalance] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<YearlyBreakdown[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const calculateSIP = () => {
    const monthlyRate = returnRate / 12 / 100;
    let yearlyBreakdown: YearlyBreakdown[] = [];
    let currentValue = startingBalance;
    const investment = monthlyInvestment || 0;

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        currentValue = (currentValue + investment) * (1 + monthlyRate);
      }
      
      const yearlyInvested = investment * 12;
      const totalInvested = yearlyInvested * year + startingBalance;
      const returns = currentValue - totalInvested;
      
      yearlyBreakdown.push({
        year,
        invested: totalInvested,
        returns,
        totalValue: currentValue
      });
    }

    setBreakdown(yearlyBreakdown);
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, years, returnRate, startingBalance]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  };

  const handleMonthlyInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setMonthlyInvestment(0);
    } else {
      setMonthlyInvestment(Math.max(0, Number(value)));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const latestValues = breakdown[breakdown.length - 1] || {
    invested: 0,
    returns: 0,
    totalValue: 0
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <img src="./made_in_india.png" alt="made in india logo"  width={200} height={200}/>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Calculator className="h-10 w-10 text-blue-600" />
            SIP Calculator
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDonationModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <Heart size={20} />
              Donate
            </button>
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LogIn size={20} />
                Login
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <IndianRupee className="h-4 w-4" />
                  Monthly Investment
                </label>
                <input
                  type="number"
                  value={monthlyInvestment || ''}
                  onChange={handleMonthlyInvestmentChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className="h-4 w-4" />
                  Investment Period (Years)
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1 Year</span>
                  <span>{years} Years</span>
                  <span>30 Years</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <TrendingUp className="h-4 w-4" />
                  Expected Annual Return (%)
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1%</span>
                  <span>{returnRate}%</span>
                  <span>50%</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Wallet className="h-4 w-4" />
                  Starting Balance (Optional)
                </label>
                <input
                  type="number"
                  value={startingBalance || ''}
                  onChange={(e) => setStartingBalance(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Investment Summary</h2>
            
            <div className="space-y-6">
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">Total Value after {years} years</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(latestValues.totalValue)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Investment</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency(latestValues.invested)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Returns</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency(latestValues.returns)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Year-by-Year Breakdown</h3>
                <div className="max-h-64 overflow-y-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Year</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-500 dark:text-gray-300">Invested</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-500 dark:text-gray-300">Returns</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-500 dark:text-gray-300">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {breakdown.map((year) => (
                        <tr key={year.year}>
                          <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{year.year}</td>
                          <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 text-right">{formatCurrency(year.invested)}</td>
                          <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 text-right">{formatCurrency(year.returns)}</td>
                          <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 text-right">{formatCurrency(year.totalValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
      <Footer />
    </div>
  );
}

export default App;