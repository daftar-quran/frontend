export interface ICalledRessources {
  surahs: boolean;
  mushafs: boolean;
  calledAll: boolean;
}

export class CalledRessources implements ICalledRessources {
  surahs: boolean;
  mushafs: boolean;
  calledAll: boolean;

  constructor() {
    this.surahs = false;
    this.mushafs = false;

    this.calledAll = false;
  }
}
