import mixpanel from 'mixpanel-browser';

let actions = {
  init: () => {
    let env_check = process.env.NODE_ENV === 'production';
    mixpanel.init(process.env.REACT_APP_MIX_PANEL);
    mixpanel.set_config({debug: !env_check});
  },

  identify: (id) => {
    mixpanel.identify(id);
  },

  alias: (id) => {
    mixpanel.alias(id);
  },

  track: (name = '', props = {}) => {
    mixpanel.track(name, props);
  },
  
  people: {
    set: (props) => {
      mixpanel.people.set(props);
    },
  },
};

export const mixPanel = actions;