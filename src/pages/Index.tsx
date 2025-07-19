import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShoppingCart, Users, Calendar, CheckCircle, User, LogOut, Package, ChefHat, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
  const [user, setUser] = useState<User | null>(null);
  const [mealSelection, setMealSelection] = useState<MealSelection>({
    breakfast: [],
    lunch: [],
    dinner: [],
    frequencies: {}
  });
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const { toast } = useToast();

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const familySize = parseInt(formData.get('familySize') as string);

    if (username && password && familySize) {
      setUser({ username, familySize });
      setCurrentStep('welcome');
      toast({
        title: "Welcome!",
        description: `Hello ${username}! Let's plan your groceries.`,
      });
    }
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
    <div className="absolute top-6 right-6 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20 hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm text-left">
              <div className="font-semibold text-gray-800">{user?.username}</div>
              <div className="text-gray-500 flex items-center gap-1 text-xs">
                <Users className="w-3 h-3" />
                {user?.familySize} members
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 bg-white/95 backdrop-blur-sm border-white/20">
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ChefHat className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Meal Cart Planner Pro
          </CardTitle>
          <p className="text-gray-600 mt-2">Plan your perfect monthly grocery list</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
              <Input 
                id="username" 
                name="username" 
                placeholder="Enter your username" 
                required 
                className="mt-1 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Enter your password" 
                required 
                className="mt-1 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="familySize" className="flex items-center gap-2 text-sm font-medium text-gray-700">
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
                className="mt-1 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <Button type="submit" className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Sign In & Start Planning
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const renderWelcome = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <UserProfile />
      <Card className="w-full max-w-lg text-center relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Star className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome {user?.username}!
          </CardTitle>
          <p className="text-gray-600 flex items-center justify-center gap-2 mt-3">
            <Users className="h-4 w-4" />
            Planning for {user?.familySize} family members
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-lg text-gray-700">
            Ready to create your perfect monthly grocery plan?
          </div>
          <div className="space-y-4">
            <Button 
              onClick={() => setCurrentStep('meals')} 
              className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="mr-3 h-6 w-6" />
              Yes, Let's Start Planning!
            </Button>
            <Button variant="outline" className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium">
              Maybe Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMealSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <UserProfile />
      <div className="max-w-6xl mx-auto relative z-10">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Select Your Meals
            </CardTitle>
            <p className="text-gray-600 text-lg mt-3">Choose which meals you'd like to plan for the month</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { type: 'breakfast', name: 'Breakfast', color: 'from-yellow-400 to-orange-500', icon: '🌅', desc: 'Start your day right' },
                { type: 'lunch', name: 'Lunch', color: 'from-green-400 to-blue-500', icon: '☀️', desc: 'Midday energy boost' },
                { type: 'dinner', name: 'Dinner', color: 'from-purple-400 to-pink-500', icon: '🌙', desc: 'Evening satisfaction' }
              ].map(meal => (
                <Card 
                  key={meal.type}
                  className="cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border-0 bg-white/90 backdrop-blur-sm group"
                  onClick={() => {
                    setSelectedMealType(meal.type as 'breakfast' | 'lunch' | 'dinner');
                    setCurrentStep(meal.type as 'breakfast' | 'lunch' | 'dinner');
                  }}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${meal.color} flex items-center justify-center text-4xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      {meal.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{meal.name}</h3>
                    <p className="text-gray-600 font-medium">{meal.desc}</p>
                    <p className="text-gray-500 text-sm mt-2">Plan your {meal.name.toLowerCase()} options</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderFoodSelection = (mealType: 'breakfast' | 'lunch' | 'dinner') => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <UserProfile />
      <div className="max-w-7xl mx-auto relative z-10">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent capitalize">
              Select {mealType} Items
            </CardTitle>
            <p className="text-gray-600 text-lg mt-3">Choose your favorite {mealType} options for the month</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {mealOptions[mealType].map(item => (
                <Card 
                  key={item.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 group ${
                    mealSelection[mealType].includes(item.id) 
                      ? 'ring-4 ring-purple-500 bg-purple-50 shadow-xl' 
                      : 'hover:shadow-xl border-0 bg-white/90 backdrop-blur-sm'
                  }`}
                  onClick={() => toggleSelection(mealType, item.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <span className="text-3xl">🍽️</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 text-lg mb-2">{item.name}</h4>
                    {mealSelection[mealType].includes(item.id) && (
                      <div className="flex items-center justify-center mt-3">
                        <Badge className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Selected
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <Button 
                variant="outline"
                className="h-12 px-8 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium"
                onClick={() => setCurrentStep('meals')}
              >
                Back to Meals
              </Button>
              <Button 
                onClick={() => setCurrentStep('confirmation')}
                disabled={mealSelection[mealType].length === 0}
                className="h-12 px-8 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                Continue to Frequencies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const allSelectedItems = [...mealSelection.breakfast, ...mealSelection.lunch, ...mealSelection.dinner];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <UserProfile />
        <div className="max-w-5xl mx-auto relative z-10">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Confirm Your Meal Plan
              </CardTitle>
              <p className="text-gray-600 text-lg mt-3">Set how many times you'll have each meal per month</p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-6 mb-10">
                {allSelectedItems.map(itemId => {
                  const item = Object.values(mealOptions).flat().find(i => i.id === itemId);
                  return (
                    <div key={itemId} className="flex items-center justify-between p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-2xl">🍽️</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">{item?.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Label htmlFor={`freq-${itemId}`} className="text-sm font-medium text-gray-600">
                          Times/Month:
                        </Label>
                        <Input
                          id={`freq-${itemId}`}
                          type="number"
                          min="1"
                          max="30"
                          defaultValue="4"
                          className="w-24 h-10 text-center border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                          onChange={(e) => updateFrequency(itemId, parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <Button 
                  variant="outline"
                  className="h-12 px-8 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium"
                  onClick={() => setCurrentStep('meals')}
                >
                  Back to Meal Selection
                </Button>
                <Button 
                  onClick={() => setCurrentStep('shopping')}
                  className="h-12 px-8 bg-gradient-to-r from-indigo-500 to-cyan-600 hover:from-indigo-600 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Generate Shopping List
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderShoppingList = () => {
    const shoppingList = generateShoppingList();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <UserProfile />
        <div className="max-w-5xl mx-auto relative z-10">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                Your Monthly Shopping List
              </CardTitle>
              <p className="text-gray-600 text-lg mt-3">Customized for {user?.familySize} family members</p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {Object.entries(shoppingList).map(([ingredient, quantity]) => (
                  <div key={ingredient} className="flex items-center justify-between p-5 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="font-semibold text-gray-800 text-lg">{ingredient}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-500 text-white px-3 py-1 rounded-full font-semibold">
                        ×{quantity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center space-y-6 pt-6 border-t border-gray-200">
                <Button 
                  onClick={() => {
                    toast({
                      title: "Shopping list saved!",
                      description: "Your monthly grocery plan has been saved successfully.",
                    });
                  }}
                  className="h-14 px-10 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Save Shopping List
                </Button>
                <Button 
                  variant="outline"
                  className="h-12 px-8 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium"
                  onClick={() => setCurrentStep('welcome')}
                >
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
