import{a as n}from"./chunk-ZUABGXMI.js";import{Jb as o,N as r,S as s}from"./chunk-ADDNN3XJ.js";var f=(()=>{let t=class t extends n{constructor(i){super(i),this.http=i}visitBuilding(i){return this.httpPostRequest("/visits",{building_id:i})}getVisits(){return this.httpGetRequest("/visits")}};t.\u0275fac=function(c){return new(c||t)(s(o))},t.\u0275prov=r({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();export{f as a};