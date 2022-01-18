// pubsub.js
export default class PubSub {
  constructor() {
    this.subscribers = {};
  }

  subscribe(eventName, subscriber) {
    if (typeof subscriber !== 'function') {
      throw new Error(
        `${typeof subscriber} is not a valid argument for subscribe method, expected a function instead`,
      );
    }
    if (typeof eventName !== 'string') {
      throw new Error(
        `${typeof eventName} is not a valid argument for subscribe method, expected a string instead`,
      );
    }
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(subscriber);
  }

  unsubscribe(eventName, subscriber) {
    if (typeof subscriber !== 'function') {
      throw new Error(
        `${typeof subscriber} is not a valid argument for unsubscribe method, expected a function instead`,
      );
    }
    if (typeof eventName !== 'string') {
      throw new Error(
        `${typeof eventName} is not a valid argument for unsubscribe method, expected a string instead`,
      );
    }
    if (this.subscribers[eventName]) {
      for (var i = 0; i < this.subscribers[eventName].length; i++) {
        if (this.subscribers[eventName][i] === subscriber) {
          this.subscribers[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  publish(eventName, payload) {
    if (typeof eventName !== 'string') {
      throw new Error(
        `${typeof eventName} is not a valid argument for publish method, expected a string instead`,
      );
    }
    if (this.subscribers[eventName]) {
      this.subscribers[eventName].forEach((subscriber) => subscriber(payload));
    }
  }
}

// const sayWhat1 = (string) => {
//   console.log(string);
// };
// pubSub.subscribe('activate', sayWhat1);

// const sayWhat2 = (string) => {
//   console.log(string + ' 2');
// };
// pubSub.subscribe('activate', sayWhat2);

// const sayWhat3 = () => {
//   console.log('3');
// };
// pubSub.subscribe('activate', sayWhat3);

// pubSub.publish('activate');
// pubSub.publish('activate', 'test again');
