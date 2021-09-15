import produce from 'immer';
import {
  GET_CATEGORY_ERROR,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_REQUEST,
  SET_CATEGORY_SELECTED,
  SET_CATEGORY_SEARCH_DEFAULT,
} from './actionTypes';

const initial = {
  categories: [],
  category_select: {
    "text_search": '',
    "id_selected": '0',
    "id_explaned": [],
    "is_search": false,
    "label": {
      "label_parent": '',
      "label_child": '',
    },
  },
};

export const CategoryReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CATEGORY_SUCCESS: {
        draft.categories = action.payload;
        break;
      }

      case SET_CATEGORY_SELECTED: {
        draft.category_select = action.payload;
        break;
      }

      case SET_CATEGORY_SEARCH_DEFAULT: {
        const category_select = {
          text_search: '',
          id_selected: '0',
          id_explaned: [],
          is_search: false,
          label: {
            label_parent: '',
            label_child: '',
          }
        };
        draft.category_select = category_select;
        break;
      }
    }
  });
export default {
  CategoryReducer,
};
