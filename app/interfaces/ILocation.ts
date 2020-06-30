export interface ILocation {
    _id: any;
    coordinates: any;
    is_active: boolean;
    duration: number;
    worker_id: any;
  }
  
  export interface ILocationInput{
    coordinates: any;
    is_active: boolean;
    duration: number;
    worker_id: any;
  }