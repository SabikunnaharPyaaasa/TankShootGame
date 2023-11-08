import { _decorator, Component, loader, Node } from 'cc';
//import * as firebase from 'firebase/app';

//import firebase from 'firebase/app';
//import 'firebase/database';
const { ccclass, property } = _decorator;

@ccclass('FirebaseIntegration')
export class FirebaseIntegration extends Component {

//     static arrTowerMinigame :string [][]=
// {
    //player_level, enemy_1_level, enemy_2_level, ...., enemy_n_level (ground floor to nth floor order)
    //for double enemy: right_enemy_level&left_enemy_level
//     "3,2",
//     "5,5,3",
//     "5,3,5",
//     "8,6,12&8,22",
//     "7,12&10,8&6,20",
//     "9,12,8,20",
//     "10,8,10,25,75,45",
//     "9,35,6,14,7,11,81",
//     "13,11&1,18&2,37&4,69&2,145&9,291",
//     "20,45,10,25",
//     "11,4,5,18",
//     "12,35,15&13,10&5",
//     "15,15,10,28",
//     "15,40&20,25&5,14,99",
//     "16,10,15,35",
//     "17,12,25",
//     "20,35,18,50",
//     "24,16,20,49,99",
//     "25,25,30,15,85",
//     "26,20,4,45&3,80",
//     "27,30&5,50&20,70,95",
//     "28,99,76,50,23",
//     "31,15,5,47,85",
//     "31,25&20,80,65",
//     "32,20&35,65,20,120",
//     "32,10&48,30,100",
//     "33,110,40&10,50",
//     "34,40,15,20&16,120",
//     "35,10,15&30,40&15,140",
//     "36,25&10,65&30,150",
//     "38,160,35&30,99",
//     "45,22,25&30,115",
//     "47,25,90,55&5,180",
//     "49,80,48,260&25,160",
//     "50,80&24,200,26,40,100,500"
// };

     // The URLs of the Firebase SDK scripts you want to load
     private firebaseScriptURLs: string[] = [
        'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js',
        'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js'
    ];

      // Firebase configuration
      private firebaseConfig = {
        apiKey: "AIzaSyBmh_zeh-G8dN56KkOMUeCsZ1hd1v7xzpw",
        authDomain: "tankshoot-8a5cc.firebaseapp.com",
        databaseURL: "https://tankshoot-8a5cc-default-rtdb.firebaseio.com",
        projectId: "tankshoot-8a5cc",
        storageBucket: "tankshoot-8a5cc.appspot.com",
        messagingSenderId: "852232326599",
        appId: "1:852232326599:web:cd2b129aad0dcae9075de2",
        measurementId: "G-BXJ3W5YSNN"
        
    };

    start() {

          // Load Firebase SDK scripts
          loader.load(this.firebaseScriptURLs, (err) => {
            if (err) {
                console.error('Error loading Firebase scripts:', err);
                return;
            }

            // Initialize Firebase with the configuration
            //firebase.initializeApp(this.firebaseConfig);

            // Now, you can use Firebase services within your game
            //this.readDataFromDatabase();
        });

    }

    update(deltaTime: number) {
        
    }
}

