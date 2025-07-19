import { useState } from 'react';
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShoppingCart, Users, Calendar, CheckCircle, User, LogOut, Package, ChefHat, Clock, Star, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { MealCard } from "@/components/ui/meal-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

interface User {
  username: string;
  familySize: number;
}

interface MealSelection {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  frequencies: { [key: string]: number };
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'signin' | 'welcome' | 'meals' | 'breakfast' | 'lunch' | 'dinner' | 'confirmation' | 'shopping'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mealSelection, setMealSelection] = useState<MealSelection>({
    breakfast: [],
    lunch: [],
    dinner: [],
    frequencies: {}
  });
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const { toast } = useToast();

  const progressSteps = ['Sign In', 'Welcome', 'Meals', 'Selection', 'Confirm', 'Shopping'];
  const getCurrentStepIndex = () => {
    switch (currentStep) {
      case 'signin': return 0;
      case 'welcome': return 1;
      case 'meals': return 2;
      case 'breakfast':
      case 'lunch':
      case 'dinner': return 3;
      case 'confirmation': return 4;
      case 'shopping': return 5;
      default: return 0;
    }
  };

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const familySize = parseInt(formData.get('familySize') as string);

    // Simulate API call
    setTimeout(() => {
      if (username && password && familySize) {
        setUser({ username, familySize });
        setCurrentStep('welcome');
        setIsLoading(false);
        toast({
          title: "Welcome!",
          description: `Hello ${username}! Let's plan your groceries.`,
        });
      } else {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('signin');
    setMealSelection({ breakfast: [], lunch: [], dinner: [], frequencies: {} });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const mealOptions = {
    breakfast: [
      { id: 'idli', name: 'Idli', image: '/placeholder.svg' },
      { id: 'dosa', name: 'Dosa', image: '/placeholder.svg' },
      { id: 'bread', name: 'Bread & Butter', image: '/placeholder.svg' },
      { id: 'omelet', name: 'Omelet', image: '/placeholder.svg' },
      { id: 'upma', name: 'Upma', image: '/placeholder.svg' },
      { id: 'poha', name: 'Poha', image: '/placeholder.svg' }
    ],
    lunch: [
      { id: 'rice-dal', name: 'Rice & Dal', image: '/placeholder.svg' },
      { id: 'chapati', name: 'Chapati & Curry', image: '/placeholder.svg' },
      { id: 'biryani', name: 'Biryani', image: '/placeholder.svg' },
      { id: 'pulao', name: 'Pulao', image: '/placeholder.svg' },
      { id: 'sambar', name: 'Sambar Rice', image: '/placeholder.svg' },
      { id: 'curd-rice', name: 'Curd Rice', image: '/placeholder.svg' }
    ],
    dinner: [
      { id: 'curry-rice', name: 'Curry & Rice', image: '/placeholder.svg' },
      { id: 'roti-sabzi', name: 'Roti & Sabzi', image: '/placeholder.svg' },
      { id: 'dal-chawal', name: 'Dal Chawal', image: '/placeholder.svg' },
      { id: 'fried-rice', name: 'Fried Rice', image: '/placeholder.svg' },
      { id: 'soup', name: 'Soup & Bread', image: '/placeholder.svg' },
      { id: 'pasta', name: 'Pasta', image: '/placeholder.svg' }
    ]
  };

  const ingredients = {
    'idli': ['Rice (2kg)', 'Urad Dal (500g)', 'Fenugreek seeds (50g)', 'Salt (100g)'],
    'dosa': ['Rice (2kg)', 'Urad Dal (500g)', 'Chana Dal (200g)', 'Oil (500ml)'],
    'bread': ['Bread (4 loaves)', 'Butter (500g)', 'Jam (2 jars)'],
    'omelet': ['Eggs (2 dozen)', 'Onions (1kg)', 'Tomatoes (500g)', 'Oil (500ml)'],
    'upma': ['Semolina (1kg)', 'Vegetables (2kg)', 'Mustard seeds (100g)', 'Curry leaves (50g)'],
    'poha': ['Flattened Rice (1kg)', 'Peanuts (500g)', 'Onions (1kg)', 'Green chilies (200g)'],
    'rice-dal': ['Rice (5kg)', 'Toor Dal (2kg)', 'Turmeric (100g)', 'Ghee (500ml)'],
    'chapati': ['Wheat Flour (5kg)', 'Vegetables (3kg)', 'Spices (mixed)', 'Oil (1L)'],
    'biryani': ['Basmati Rice (2kg)', 'Chicken/Mutton (2kg)', 'Biryani Masala (200g)', 'Ghee (500ml)'],
    'pulao': ['Rice (3kg)', 'Vegetables (2kg)', 'Whole spices', 'Ghee (500ml)'],
    'sambar': ['Toor Dal (2kg)', 'Sambar powder (500g)', 'Vegetables (3kg)', 'Tamarind (500g)'],
    'curd-rice': ['Rice (2kg)', 'Curd (2L)', 'Mustard seeds (100g)', 'Curry leaves (50g)'],
    'curry-rice': ['Rice (3kg)', 'Mixed vegetables (3kg)', 'Curry powder (500g)', 'Coconut (5 pieces)'],
    'roti-sabzi': ['Wheat Flour (3kg)', 'Seasonal vegetables (4kg)', 'Spices (mixed)', 'Oil (1L)'],
    'dal-chawal': ['Rice (3kg)', 'Mixed Dal (2kg)', 'Turmeric (100g)', 'Ghee (500ml)'],
    'fried-rice': ['Rice (2kg)', 'Vegetables (2kg)', 'Soy sauce (2 bottles)', 'Oil (500ml)'],
    'soup': ['Mixed vegetables (2kg)', 'Bread (2 loaves)', 'Herbs (mixed)', 'Cream (500ml)'],
    'pasta': ['Pasta (2kg)', 'Tomatoes (2kg)', 'Cheese (500g)', 'Herbs (mixed)']
  };

  const toggleSelection = (mealType: 'breakfast' | 'lunch' | 'dinner', itemId: string) => {
    setMealSelection(prev => ({
      ...prev,
      [mealType]: prev[mealType].includes(itemId)
        ? prev[mealType].filter(id => id !== itemId)
        : [...prev[mealType], itemId]
    }));
  };

  const updateFrequency = (itemId: string, frequency: number) => {
    setMealSelection(prev => ({
      ...prev,
      frequencies: { ...prev.frequencies, [itemId]: frequency }
    }));
  };

  const generateShoppingList = () => {
    const shoppingList: { [key: string]: number } = {};
    
    [...mealSelection.breakfast, ...mealSelection.lunch, ...mealSelection.dinner].forEach(item => {
      const frequency = mealSelection.frequencies[item] || 1;
      const itemIngredients = ingredients[item as keyof typeof ingredients] || [];
      
      itemIngredients.forEach(ingredient => {
        const multiplier = frequency * (user?.familySize || 1);
        if (shoppingList[ingredient]) {
          shoppingList[ingredient] += multiplier;
        } else {
          shoppingList[ingredient] = multiplier;
        }
      });
    });

    return shoppingList;
  };

  const UserProfile = () => (
    <div className="absolute top-8 right-8 z-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-5 border border-white/30 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-800 text-lg">{user?.username}</div>
              <div className="text-gray-500 flex items-center gap-1 text-sm">
                <Users className="w-3 h-3" />
                {user?.familySize} members
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl rounded-2xl">
          <DropdownMenuLabel>Account Details</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <div>
              <div className="font-medium">{user?.username}</div>
              <div className="text-sm text-gray-500">Username</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <div>
              <div className="font-medium">{user?.familySize} members</div>
              <div className="text-sm text-gray-500">Family size</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <div>
              <div className="font-medium">Previous Orders</div>
              <div className="text-sm text-gray-500">No orders yet</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 focus:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const renderSignIn = () => (
    <AnimatedBackground variant="signin">
      <div className="min-h-screen flex items-center justify-center p-6">
        <GlassCard className="w-full max-w-lg" variant="elevated">
          <GlassCardHeader>
            <IconWrapper variant="warning" size="xl" animated>
              <ChefHat className="h-10 w-10" />
            </IconWrapper>
            <div className="mt-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Meal Cart Planner Pro
          </CardTitle>
              <p className="text-gray-600 mt-3 text-lg">Plan your perfect monthly grocery list</p>
            </div>
          </GlassCardHeader>
          <GlassCardContent>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</Label>
              <Input 
                id="username" 
                name="username" 
                placeholder="Enter your username" 
                required 
                  className="h-14 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl text-lg"
              />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Enter your password" 
                required 
                  className="h-14 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl text-lg"
              />
              </div>
              <div className="space-y-2">
                <Label htmlFor="familySize" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Users className="h-4 w-4" />
                Family Members
              </Label>
              <Input 
                id="familySize" 
                name="familySize" 
                type="number" 
                min="1" 
                max="20" 
                placeholder="Number of family members" 
                required 
                  className="h-14 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl text-lg"
              />
              </div>
              <GradientButton 
                type="submit" 
                variant="warning" 
                size="xl" 
                className="w-full mt-8"
                loading={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In & Start Planning'}
              </GradientButton>
          </form>
          </GlassCardContent>
        </GlassCard>
      </div>
    </AnimatedBackground>
  );

  const renderWelcome = () => (
    <AnimatedBackground variant="welcome">
      <UserProfile />
      <div className="min-h-screen flex items-center justify-center p-6">
        <GlassCard className="w-full max-w-2xl text-center" variant="elevated">
          <GlassCardHeader>
            <ProgressIndicator steps={progressSteps} currentStep={getCurrentStepIndex()} />
            <IconWrapper variant="primary" size="xl" animated>
              <Star className="h-12 w-12" />
            </IconWrapper>
            <div className="mt-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome {user?.username}!
          </CardTitle>
              <p className="text-gray-600 flex items-center justify-center gap-2 mt-4 text-lg">
            <Users className="h-4 w-4" />
            Planning for {user?.familySize} family members
          </p>
            </div>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="text-xl text-gray-700 mb-10">
            Ready to create your perfect monthly grocery plan?
          </div>
            <div className="space-y-6">
              <GradientButton
              onClick={() => setCurrentStep('meals')} 
                variant="success"
                size="xl"
                className="w-full"
              >
              <Calendar className="mr-3 h-6 w-6" />
              Yes, Let's Start Planning!
              </GradientButton>
              <Button variant="outline" className="w-full h-14 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold text-lg">
              Maybe Later
            </Button>
          </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </AnimatedBackground>
  );

  const renderMealSelection = () => (
    <AnimatedBackground variant="meals">
      <UserProfile />
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <GlassCard variant="elevated">
            <GlassCardHeader>
              <ProgressIndicator steps={progressSteps} currentStep={getCurrentStepIndex()} />
              <IconWrapper variant="success" size="xl" animated>
                <ChefHat className="h-10 w-10" />
              </IconWrapper>
              <div className="mt-6">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Select Your Meals
            </CardTitle>
                <p className="text-gray-600 text-xl mt-4">Choose which meals you'd like to plan for the month</p>
              </div>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="grid md:grid-cols-3 gap-10">
              {[
                  { type: 'breakfast', name: 'Breakfast', color: 'from-yellow-400 to-orange-500', icon: '🌅', desc: 'Start your day right', variant: 'warning' },
                  { type: 'lunch', name: 'Lunch', color: 'from-green-400 to-blue-500', icon: '☀️', desc: 'Midday energy boost', variant: 'success' },
                  { type: 'dinner', name: 'Dinner', color: 'from-purple-400 to-pink-500', icon: '🌙', desc: 'Evening satisfaction', variant: 'primary' }
              ].map(meal => (
                  <GlassCard
                  key={meal.type}
                    className="cursor-pointer group"
                    variant="elevated"
                  onClick={() => {
                    setSelectedMealType(meal.type as 'breakfast' | 'lunch' | 'dinner');
                    setCurrentStep(meal.type as 'breakfast' | 'lunch' | 'dinner');
                  }}
                >
                    <GlassCardContent className="p-10 text-center">
                      <div className={`w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r ${meal.color} flex items-center justify-center text-5xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                      {meal.icon}
                    </div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-3">{meal.name}</h3>
                      <p className="text-gray-600 font-semibold text-lg">{meal.desc}</p>
                      <p className="text-gray-500 mt-3">Plan your {meal.name.toLowerCase()} options</p>
                      <div className="mt-6">
                        <ArrowRight className="w-6 h-6 mx-auto text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>
              ))}
            </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </AnimatedBackground>
  );

  const renderFoodSelection = (mealType: 'breakfast' | 'lunch' | 'dinner') => (
    <AnimatedBackground variant="selection">
      <UserProfile />
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <GlassCard variant="elevated">
            <GlassCardHeader>
              <ProgressIndicator steps={progressSteps} currentStep={getCurrentStepIndex()} />
              <IconWrapper variant="danger" size="xl" animated>
                <ChefHat className="h-10 w-10" />
              </IconWrapper>
              <div className="mt-6">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent capitalize">
              Select {mealType} Items
            </CardTitle>
                <p className="text-gray-600 text-xl mt-4">Choose your favorite {mealType} options for the month</p>
              </div>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
              {mealOptions[mealType].map(item => (
                  <MealCard
                  key={item.id}
                    id={item.id}
                    name={item.name}
                    selected={mealSelection[mealType].includes(item.id)}
                  onClick={() => toggleSelection(mealType, item.id)}
                    variant="selection"
                  />
              ))}
            </div>
              <div className="flex justify-between items-center pt-8 border-t border-gray-200/50">
              <Button 
                variant="outline"
                  className="h-14 px-10 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold text-lg"
                onClick={() => setCurrentStep('meals')}
              >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Meals
              </Button>
                <GradientButton
                onClick={() => setCurrentStep('confirmation')}
                disabled={mealSelection[mealType].length === 0}
                  variant="danger"
                  size="lg"
                >
                Continue to Frequencies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GradientButton>
            </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </AnimatedBackground>
  );

  const renderConfirmation = () => {
    const allSelectedItems = [...mealSelection.breakfast, ...mealSelection.lunch, ...mealSelection.dinner];
    
    return (
      <AnimatedBackground variant="confirmation">
        <UserProfile />
        <div className="min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <GlassCard variant="elevated">
              <GlassCardHeader>
                <ProgressIndicator steps={progressSteps} currentStep={getCurrentStepIndex()} />
                <IconWrapper variant="info" size="xl" animated>
                  <Clock className="h-10 w-10" />
                </IconWrapper>
                <div className="mt-6">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Confirm Your Meal Plan
              </CardTitle>
                  <p className="text-gray-600 text-xl mt-4">Set how many times you'll have each meal per month</p>
                </div>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="space-y-8 mb-12">
                {allSelectedItems.map(itemId => {
                  const item = Object.values(mealOptions).flat().find(i => i.id === itemId);
                  return (
                      <div key={itemId} className="flex items-center justify-between p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-2xl">🍽️</span>
                        </div>
                          <span className="font-bold text-gray-800 text-xl">{item?.name}</span>
                      </div>
                        <div className="flex items-center gap-4">
                          <Label htmlFor={`freq-${itemId}`} className="text-lg font-semibold text-gray-600">
                          Times/Month:
                        </Label>
                        <Input
                          id={`freq-${itemId}`}
                          type="number"
                          min="1"
                          max="30"
                          defaultValue="4"
                            className="w-28 h-12 text-center border-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl text-lg font-semibold"
                          onChange={(e) => updateFrequency(itemId, parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
                <div className="flex justify-between items-center pt-8 border-t border-gray-200/50">
                <Button 
                  variant="outline"
                    className="h-14 px-10 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold text-lg"
                  onClick={() => setCurrentStep('meals')}
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Meal Selection
                </Button>
                  <GradientButton
                  onClick={() => setCurrentStep('shopping')}
                    variant="info"
                    size="lg"
                  >
                  Generate Shopping List
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </GradientButton>
              </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        </div>
      </AnimatedBackground>
    );
  };

  const renderShoppingList = () => {
    const shoppingList = generateShoppingList();
    
    return (
      <AnimatedBackground variant="shopping">
        <UserProfile />
        <div className="min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <GlassCard variant="elevated">
              <GlassCardHeader>
                <ProgressIndicator steps={progressSteps} currentStep={getCurrentStepIndex()} />
                <IconWrapper variant="success" size="xl" animated>
                  <ShoppingCart className="h-10 w-10" />
                </IconWrapper>
                <div className="mt-6">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                Your Monthly Shopping List
              </CardTitle>
                  <p className="text-gray-600 text-xl mt-4">Customized for {user?.familySize} family members</p>
                </div>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                {Object.entries(shoppingList).map(([ingredient, quantity]) => (
                    <div key={ingredient} className="flex items-center justify-between p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-md"></div>
                        <span className="font-bold text-gray-800 text-lg">{ingredient}</span>
                    </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                        ×{quantity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
                <div className="text-center space-y-8 pt-8 border-t border-gray-200/50">
                  <GradientButton
                  onClick={() => {
                    toast({
                      title: "Shopping list saved!",
                      description: "Your monthly grocery plan has been saved successfully.",
                    });
                  }}
                    variant="success"
                    size="xl"
                  >
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Save Shopping List
                  </GradientButton>
                <Button 
                  variant="outline"
                    className="h-14 px-10 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold text-lg"
                  onClick={() => setCurrentStep('welcome')}
                >
                  Start Over
                </Button>
              </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        </div>
      </AnimatedBackground>
    );
  };

  // Render based on current step
  switch (currentStep) {
    case 'signin': return renderSignIn();
    case 'welcome': return renderWelcome();
    case 'meals': return renderMealSelection();
    case 'breakfast': return renderFoodSelection('breakfast');
    case 'lunch': return renderFoodSelection('lunch');
    case 'dinner': return renderFoodSelection('dinner');
    case 'confirmation': return renderConfirmation();
    case 'shopping': return renderShoppingList();
    default: return renderSignIn();
  }
};

export default Index;
