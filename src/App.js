import './App.css';
import React, { useEffect, useState } from 'react';
import MyList from './MyList';
import MyMealsAndIngredients from './MyMealsAndIngredients';
import uuid from 'react-uuid';


function App() {
const [mealPlans, setMealPlants] = useState(
  localStorage.mealPlans ? JSON.parse(localStorage.mealPlans) : []);
const [selectedDay, setSelectedDay] = useState(false);

useEffect(() => {
  localStorage.setItem("mealPlans", JSON.stringify(mealPlans))
}, [mealPlans])

const addMeal = () => {
  const newMeal = {
    title:"Today is...",
    id:uuid(),
    mealForADay:"",
    ingredients:"",
    
  }
  // передаём в другой компонент.Создаём новый массив

  setMealPlants([newMeal, ...mealPlans])
  console.log(newMeal)
}
// delete button
const deleteDay = (mealId) => {
  setMealPlants(mealPlans.filter(({id}) => id !== mealId)  )
}

const updateDay = (myUpdatedMeal) => {
  const updatedMeals = mealPlans.map((mealPlan) => {
    if (mealPlan.id === myUpdatedMeal.id) {
      return myUpdatedMeal;
    }
    return mealPlan;
  })
  setMealPlants(updatedMeals)
}
const getActiveMeal = () => {
  return mealPlans.find(({id}) => id === selectedDay)
}
return(
  <div className='App'>
    <MyList mealPlans={mealPlans} 
            addMeal={addMeal} 
            deleteDay={deleteDay}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}/>
    <MyMealsAndIngredients selectedDay={getActiveMeal()} updateDay={updateDay}/>
  </div>
)

}

export default App;
