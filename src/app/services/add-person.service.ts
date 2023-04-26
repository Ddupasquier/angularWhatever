import { HttpClient } from '@angular/common/http'; // import the HttpClient module for making HTTP requests
import { Injectable } from '@angular/core'; // import the Injectable decorator for making the service injectable
import { BehaviorSubject } from 'rxjs'; // import the BehaviorSubject for managing a stream of data
import { Person } from '../models/person'; // import the Person model/interface

@Injectable({
  providedIn: 'root',
})
export class AddPersonService { // declare the AddPersonService class
  private _people = new BehaviorSubject<Person[]>([]); // create a new instance of BehaviorSubject with an empty array of Person objects

  people$ = this._people.asObservable(); // create a public property that is an observable of _people

  constructor(private http: HttpClient) { // define a constructor that takes an instance of HttpClient
    this.fetchPeople(); // call the fetchPeople method to retrieve a list of people
  }

  fetchPeople() { // define a method to fetch a list of people
    this.http.get<Person[]>('assets/api.json').subscribe((data) => { // make an HTTP GET request to the api.json file in the assets folder
      this._people.next(data); // update the _people property with the retrieved data using the next method of the BehaviorSubject
    });
  }

  addPerson(person: Person) { // define a method to add a new person object
    const currentPeople = this._people.getValue(); // get the current value of _people using the getValue method of the BehaviorSubject
    this._people.next([...currentPeople, person]); // update the _people property with a new array that includes the current array and the new person object using the next method of the BehaviorSubject
  }
}

/*
HttpClient: HttpClient is a service provided by Angular that allows you to make HTTP requests to external APIs or resources. It provides a simple and consistent API for making GET, POST, PUT, DELETE, and other types of HTTP requests.

Injectable decorator: Injectable is a decorator provided by Angular that marks a class as an injectable service. Injectable services can be used as dependencies in other classes and components.

BehaviorSubject: BehaviorSubject is a type of Subject in RxJS that stores the current value of the stream and sends it to new subscribers. It is used to manage a stream of data that can be observed and updated. A BehaviorSubject takes an initial value as a parameter when it is created and can be updated using the next method.

Observable: An Observable is a sequence of values that are emitted over time. It is a fundamental concept in reactive programming and is widely used in Angular applications. An Observable can be thought of as a stream of data that can be observed and manipulated using operators.

constructor: A constructor is a method that is called when an instance of a class is created. In Angular, constructors are used to inject dependencies, initialize properties, and perform other setup tasks.

private: The private keyword is used to make a class property or method private. Private properties and methods can only be accessed within the class that defines them.

public: The public keyword is used to make a class property or method public. Public properties and methods can be accessed from outside the class.

getValue(): getValue is a method provided by the BehaviorSubject class that returns the current value of the stream.

asObservable(): asObservable is a method provided by the BehaviorSubject class that returns an observable of the stream.

subscribe(): subscribe is a method provided by the Observable class that allows you to listen for emitted values and perform actions in response to them.
*/