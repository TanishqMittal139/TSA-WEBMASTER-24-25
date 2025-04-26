
import { Leaf, FileText, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MenuItem } from '@/types/menu';

interface DishTabsProps {
  dish: MenuItem;
}

const DishTabs = ({ dish }: DishTabsProps) => {
  return (
    <Tabs defaultValue="ingredients">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="ingredients" className="flex items-center">
          <Leaf className="h-4 w-4 mr-2" />
          Ingredients
        </TabsTrigger>
        <TabsTrigger value="nutrition" className="flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          Nutrition
        </TabsTrigger>
        <TabsTrigger value="details" className="flex items-center">
          <Info className="h-4 w-4 mr-2" />
          Details
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="ingredients" className="pt-4 animate-in fade-in-50 duration-300">
        <h3 className="font-medium mb-3">Ingredients</h3>
        {dish.ingredients && dish.ingredients.length > 0 ? (
          <ul className="space-y-2">
            {dish.ingredients.map((ingredient: string, index: number) => (
              <motion.li 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3"></div>
                {ingredient}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Ingredients information not available.</p>
        )}
      </TabsContent>
      
      <TabsContent value="nutrition" className="pt-4 animate-in fade-in-50 duration-300">
        <h3 className="font-medium mb-3">Nutrition Facts</h3>
        {dish.nutrition ? (
          <>
            <div className="border-t border-b py-2">
              <div className="font-semibold">Calories: {dish.nutrition.calories || "N/A"}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Fat</span>
                  <span className="font-medium">{dish.nutrition.fat || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Carbs</span>
                  <span className="font-medium">{dish.nutrition.carbs || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Protein</span>
                  <span className="font-medium">{dish.nutrition.protein || "N/A"}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sodium</span>
                  <span className="font-medium">{dish.nutrition.sodium || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fiber</span>
                  <span className="font-medium">{dish.nutrition.fiber || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sugar</span>
                  <span className="font-medium">{dish.nutrition.sugar || "N/A"}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">Nutrition information not available.</p>
        )}
      </TabsContent>
      
      <TabsContent value="details" className="pt-4 animate-in fade-in-50 duration-300">
        <h3 className="font-medium mb-3">Preparation Details</h3>
        <p className="text-muted-foreground mb-4">
          This {dish.name.toLowerCase()} is prepared fresh to order using high-quality ingredients 
          sourced from local suppliers whenever possible.
        </p>
        {dish.category && (
          <p className="text-muted-foreground">
            Our {dish.category === 'sandwiches' ? 'bread' : 
                 dish.category === 'soups' ? 'broths' : 
                 dish.category === 'coffee' ? 'coffee beans' : 'ingredients'} are {' '}
            {dish.category === 'coffee' ? 'ethically sourced and freshly roasted' : 'prepared fresh daily'}.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default DishTabs;
