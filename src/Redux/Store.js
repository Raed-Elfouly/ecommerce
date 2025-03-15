
import {configureStore} from '@reduxjs/toolkit'
import { counterReducer } from './CounterSlide.js'
import { brandsReducer } from './BrandsSlice.js'
import Categories from '../Component/Categories/Categories.jsx'
import { categoriesReducer } from './CategoriesSlice.js'

export let store = configureStore({
    reducer:{
        counter : counterReducer,
        brand: brandsReducer,
        categories:categoriesReducer
    }
})