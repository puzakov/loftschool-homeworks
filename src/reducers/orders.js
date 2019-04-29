import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_ORDER:
      const { id, recipe } = action.payload;
      return [
        ...state,
        {
          id,
          recipe,
          ingredients: [],
          position: 'clients'
        }
      ];
    case MOVE_ORDER_NEXT: {
      const order = state.find(item => item.id === action.payload);
      const positions = {
        clients: 'conveyor_1',
        conveyor_1: 'conveyor_2',
        conveyor_2: 'conveyor_3',
        conveyor_3: 'conveyor_4',
        conveyor_4: 'finish'
      };

      if (order.position === 'conveyor_4') {
        const isFinished = order.recipe.reduce(
          (result, value) =>
            result && order.ingredients.findIndex(item => item === value) > -1,
          true
        );
        if (!isFinished) return state;
      }
      const newPosition = positions[order.position];
      if (positions[order.position]) order.position = newPosition;
      return [...state];
    }
    case MOVE_ORDER_BACK: {
      const order = state.find(item => item.id === action.payload);
      const positions = {
        conveyor_2: 'conveyor_1',
        conveyor_3: 'conveyor_2',
        conveyor_4: 'conveyor_3',
        finish: 'conveyor_4'
      };
      const newPosition = positions[order.position];
      if (positions[order.position]) order.position = newPosition;
      return [...state];
    }
    case ADD_INGREDIENT:
      const { from, ingredient } = action.payload;
      const order = state.find(item => item.position === from);
      order.ingredients = [...order.ingredients, ingredient];
      return [...state];
    default:
      return state;
  }
};

export const getOrdersFor = (state, position) =>
  state.orders.filter(order => order.position === position);
