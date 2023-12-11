interface option {
  title: string;
  num?: number;
  handledAlarm?: number;
  handledEvent?: number;
  prob_msg?: string;
  heal_msg?: string;
  handledAmsg?: string;
  handledRmsg?: string;
}
type types = 'alarm' | 'event' | 'ops';
export type staticData = Record<types, option>;
