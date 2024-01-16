import { v4 as uuid } from 'uuid';
import { DomainEvent } from '../event/domain-event';

export type EventCallbackType = (event: DomainEvent) => void;

export type EventHandlerType = {
  listenerId: string;
  eventName: string;
  callback: EventCallbackType;
};

export class Entity {
  handlers: EventHandlerType[];

  constructor() {
    this.handlers = [];
  }

  on(eventName: string, callback: EventCallbackType) {
    const listenerId = uuid();
    this.handlers.push({ eventName, callback, listenerId });
    return listenerId;
  }

  off(listenerId: string) {
    this.handlers = this.handlers.filter(
      (handler) => handler.listenerId !== listenerId
    );
  }

  clearHandlers() {
    this.handlers = [];
  }

  dispatch(event: DomainEvent) {
    for (const handler of this.handlers) {
      if (handler.eventName === event.name) {
        handler.callback(event);
      }
    }
  }
}
