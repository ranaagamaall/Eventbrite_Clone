import React from 'react'
import classes from './categories.module.css'
import categoriesData from '../../../assets/data/categoriesData';

/**
 * Component that renders events categories in landing
 *
 * @component
 * @example
 * return (
 *   <Categories />
 * )
 */
const Categories = () => {
  return (
    <div className={classes.container}>
      <h3 className={classes.subHead}>Check out trending categories</h3>
      <div className={classes.categoriesContainer}>
        {categoriesData.map((obj) => {
          return <div className={classes.category}>{obj.icon} {obj.title}</div>
        })}
      </div>

    </div>
  );
};

export default Categories;
