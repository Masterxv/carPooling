import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Todo, TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

// ......
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef;
//......

  @ViewChild('map') mapElement: ElementRef;
 
 /* map: any;
  address: string; */
/*
  @ViewChild('search')
  title='app';
  public searchElementRef: ElementRef;  */

  /*
  public Zoom:number;
  public latitude:number;
  public longitude:number;
  public latlongs:any=[];
  public latlong:any={};
  public searchControl:FormControl; */


  constructor(private nav: NavController,
    private todoService: TodoService,
    private modalCtr: ModalController,
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private loadingController: LoadingController,
    private router: Router,

    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,

    private mapsAPILoader:MapsAPILoader,
    private ngZone:NgZone,
     
              
  ) {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

  }
  ngOnInit() {
  //  this.loadMap();
 // this.loadMaps();

 
      //set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
              types: ["address"]
          });
          autocomplete.addListener("place_changed", () => {
              this.ngZone.run(() => {
                  //get the place result
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                  //verify result
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  //set latitude, longitude and zoom
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();
                  this.zoom = 12;
              });
          });
      });

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;
        });
    }
}

  goInfoPost() {
    this.router.navigate(['info-post']);
  }
  goInfoSearch() {
    this.router.navigate(['info-search']);
  }

  /*
loadMaps(){
  this.Zoom=8;
  this.latitude=20.957722; 
  this.longitude=77.756542;
  this.searchControl=new FormControl();
  this.setCurrentPosition();

  this.mapsAPILoader.load().then(()=>{
    const autocomplete=new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,{
      types:[]
     // , ComponentRestrictions:{ 'country':'IN'}
    });
autocomplete.addListener('place_changed',()=>{
  this.NgZone.run(()=>{
const place:google.maps.places.PlaceResult=autocomplete.getPlace();
if(place.geometry===undefined || place.geometry===null){
return;
}
const latlong={
  latitude:place.geometry.location.lat(),
  longitude:place.geometry.location.lng()
};
this.latlongs.push(latlong);
this.searchControl.reset();
  });

});
  });
 
}

private setCurrentPosition(){
  if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition((position)=>{
      this.latitude=position.coords.latitude;
      this.longitude=position.coords.longitude;
      this.Zoom=8;
    })
  }
}
*/


/*
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }

*/

}
