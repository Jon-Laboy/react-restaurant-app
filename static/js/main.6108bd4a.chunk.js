(this["webpackJsonprestaurant-p7"]=this["webpackJsonprestaurant-p7"]||[]).push([[0],{21:function(e,t,a){e.exports=a.p+"static/media/person-icon.9a6884b3.png"},22:function(e,t,a){e.exports=a.p+"static/media/restaurant-icon.e43fad9f.png"},23:function(e,t,a){e.exports=a(40)},29:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(5),i=a.n(r),o=a(15),s=a(16),c=a(8),u=a.n(c),m=a(17),p=a(2),g=(a(29),a(6)),d=a(4),y=a(10),f=a(11),b=a(3),h=a(14),v=a(13),E=a(20),j=a.n(E),O=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(e){var n;return Object(y.a)(this,a),(n=t.call(this,e)).state={name:"",rating:0,address:"",visible:!1},n.handleChange=n.handleChange.bind(Object(b.a)(n)),n.submitForm=n.submitForm.bind(Object(b.a)(n)),n}return Object(f.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(d.a)({},e.target.name,e.target.value))}},{key:"submitForm",value:function(e){e.preventDefault();var t={name:this.state.name,rating:parseFloat(this.state.rating),vicinity:this.state.address,geometry:{location:{lat:this.props.newPlaceLat,lng:this.props.newPlaceLng}}};return this.props.onAddRestaurant(t)}},{key:"render",value:function(){var e=this;return l.a.createElement(j.a,{visible:this.props.visible,width:"400",height:"300",effect:"fadeInLeft",onClickAway:function(){return e.props.closeModal()}},l.a.createElement("div",null,l.a.createElement("h3",null,"Add/Edit Restaurant"),l.a.createElement("form",{onSubmit:this.submitForm},l.a.createElement("div",null,l.a.createElement("input",{type:"text",placeholder:"Name...",name:"name",value:this.state.name,onChange:this.handleChange})),l.a.createElement("div",null,l.a.createElement("label",null,"Rating:"),l.a.createElement("select",{name:"rating",value:this.state.rating,onChange:this.handleChange},l.a.createElement("option",{value:"0"},"0"),l.a.createElement("option",{value:"1"},"1"),l.a.createElement("option",{value:"2"},"2"),l.a.createElement("option",{value:"3"},"3"),l.a.createElement("option",{value:"4"},"4"),l.a.createElement("option",{value:"5"},"5"))),l.a.createElement("div",null,l.a.createElement("input",{type:"text",placeholder:"Address...",name:"address",value:this.state.address,onChange:this.handleChange})),l.a.createElement("button",{type:"submit",className:"submit-button"},"submit"))))}}]),a}(n.Component),w=a(12),C=a.n(w);var T=function(e){var t=e.firstRating,a=e.setFirstRating,n=e.secondRating,r=e.setSecondRating;return l.a.createElement("div",{className:"filter-ratings"},l.a.createElement("form",null,l.a.createElement("label",null,"Choose by Rating:"),l.a.createElement("select",{className:"rating-one",onChange:function(e){a(e.target.value)},value:t},l.a.createElement("option",{value:"0"},"0"),l.a.createElement("option",{value:"1"},"1"),l.a.createElement("option",{value:"2"},"2"),l.a.createElement("option",{value:"3"},"3"),l.a.createElement("option",{value:"4"},"4"),l.a.createElement("option",{value:"5"},"5")),"to",l.a.createElement("select",{className:"rating-two",onChange:function(e){r(e.target.value)},value:n},l.a.createElement("option",{value:"0"},"0"),l.a.createElement("option",{value:"1"},"1"),l.a.createElement("option",{value:"2"},"2"),l.a.createElement("option",{value:"3"},"3"),l.a.createElement("option",{value:"4"},"4"),l.a.createElement("option",{value:"5"},"5"))))},S=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(e){var n;return Object(y.a)(this,a),(n=t.call(this,e)).state={userReview:""},n.handleChange=n.handleChange.bind(Object(b.a)(n)),n.submitForm=n.submitForm.bind(Object(b.a)(n)),n}return Object(f.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(d.a)({userReview:e.target.value},e.target.name,e.target.value)),this.props.setInfoWindowName(e.target.name),console.log(e.target.name),console.log(e.target.value)}},{key:"submitForm",value:function(e){e.preventDefault(),this.setState({userReview:""}),this.props.setQuery(this.state.userReview),console.log("submitted")}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("form",{onSubmit:this.submitForm},l.a.createElement("textarea",{style:{padding:"1rem",borderRadius:"3px"},value:this.state.userReview,name:this.props.name,placeholder:"Add a Review...",onChange:this.handleChange}),l.a.createElement("button",{className:"submit-button",type:"submit"},"submit")))}}]),a}(n.Component);function k(e){var t=e.nearbyRestaurants,a=e.setQuery,n=e.setInfoWindowName;return l.a.createElement("div",{className:"restaurant-list"},l.a.createElement("ul",null,l.a.createElement("li",{className:"list-header"},"Restaurants"),0===t.length?l.a.createElement("li",null,"Loading...."):t.sort((function(e,t){return e.name.localeCompare(t.name)})).map((function(e){return l.a.createElement("div",{key:e.place_id},l.a.createElement("li",null,l.a.createElement("div",{style:{fontSize:"1.3rem",fontWeight:"bold"}},e.name),l.a.createElement("br",null),l.a.createElement("div",{style:{color:"gold"}},e.rating,l.a.createElement("span",null,l.a.createElement(C.a,{rating:e.rating,starDimension:"20px",starSpacing:"1px",starRatedColor:"gold",numberOfStars:5,name:"rating"}))),l.a.createElement("br",null),l.a.createElement("div",{style:{fontStyle:"italic"}},e.vicinity),l.a.createElement(S,{key:e.name,name:e.name,setQuery:a,setInfoWindowName:n})))}))))}var R=a(21),x=a.n(R),L=a(22),N=a.n(L),F="AIzaSyDyb_aKsyq5CtMO83PKMbTVL79kCLTxqc8",z=["places"],A={height:"100vh",width:"100vw"},D={styles:[{featureType:"administrative",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{lightness:"-45"}]},{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"##000000"},{visibility:"on"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#969696"},{visibility:"off"}]},{featureType:"road",elementType:"labels.text",stylers:[{hue:"#ff0000"},{saturation:"32"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{saturation:"47"},{color:"#c7c7c7"}]},{featureType:"road.local",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{visibility:"on"},{lightness:"-62"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]}],disableDefaultUI:!0,zoomControl:!0},I="https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=restaurant&keyword=restaurant&key="+F;function M(){var e=Object(g.d)({googleMapsApiKey:F,libraries:z}),t=e.isLoaded,a=e.loadError,r=Object(n.useState)({lat:0,lng:0}),i=Object(p.a)(r,2),c=i[0],d=i[1],y=Object(n.useState)(!1),f=Object(p.a)(y,2),b=f[0],h=f[1],v=Object(n.useState)(null),E=Object(p.a)(v,2),j=E[0],w=E[1],S=Object(n.useState)(null),R=Object(p.a)(S,2),L=R[0],M=R[1],P=Object(n.useState)([]),W=Object(p.a)(P,2),Q=W[0],_=W[1],K=Object(n.useState)(null),q=Object(p.a)(K,2),J=q[0],B=q[1],U=Object(n.useState)(0),V=Object(p.a)(U,2),G=V[0],H=V[1],X=Object(n.useState)(5),Y=Object(p.a)(X,2),Z=Y[0],$=Y[1],ee=Object(n.useState)(""),te=Object(p.a)(ee,2),ae=te[0],ne=te[1],le=Object(n.useState)(""),re=Object(p.a)(le,2),ie=re[0],oe=re[1],se=['"Food/service was great!"','"This place was pretty good"','"We had an okay experience"','"Did not have a great experience"'],ce=function(){h(!1),w(null)};function ue(e,t,a){return me.apply(this,arguments)}function me(){return(me=Object(m.a)(u.a.mark((function e(t,a,n){var l,r,i,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _([]),"https://cors-anywhere.herokuapp.com/",l=I+"&location="+t+","+a+"&radius="+n,e.next=5,fetch("https://cors-anywhere.herokuapp.com/"+l);case 5:return r=e.sent,e.next=8,r.json();case 8:i=e.sent,s=i.results&&i.results.filter((function(e){return e.rating>=G&&e.rating<=Z?e:null})),console.log(s),_((function(e){return[].concat(Object(o.a)(e),Object(o.a)(s))}));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){function e(){return(e=Object(m.a)(u.a.mark((function e(t,a,n){var l,r,i,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://cors-anywhere.herokuapp.com/",l=I+"&location="+t+","+a+"&radius="+n,e.next=4,fetch("https://cors-anywhere.herokuapp.com/"+l);case 4:return r=e.sent,e.next=7,r.json();case 7:i=e.sent,o=i.results&&i.results.filter((function(e){return e.rating>=G&&e.rating<=Z?e:null})),_(o);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(t,a,n){e.apply(this,arguments)}(c.lat,c.lng,3047)}),[G,Z]),navigator.geolocation?navigator.geolocation.getCurrentPosition((function(e){d((function(t){return Object(s.a)(Object(s.a)({},t),{},{lat:e.coords.latitude,lng:e.coords.longitude})}))})):console.log("error loading map"),a?"Error loading map":t?l.a.createElement("div",{className:"App"},l.a.createElement("h1",null,"Restaurant Review"),l.a.createElement(g.a,{mapContainerStyle:A,center:c,options:D,onClick:function(e){w({lat:e.latLng.lat(),lng:e.latLng.lng()}),h(!0)},zoom:13,onLoad:function(e){var t=e.getCenter();M(e),ue(t.lat(),t.lng(),3047)},onDragEnd:function(){var e=L.getCenter();ue(e.lat(),e.lng(),3047)}},l.a.createElement(g.c,{position:{lat:c.lat,lng:c.lng},icon:{url:x.a,scaledSize:new window.google.maps.Size(30,30)}}),j&&l.a.createElement(O,{visible:b,newPlaceLat:j.lat,newPlaceLng:j.lng,onAddRestaurant:function(e){_([e].concat(Object(o.a)(Q))),ce()},closeModal:function(){ce()}}),Q.map((function(e){return l.a.createElement(g.c,{key:e.place_id,position:{lat:e.geometry.location.lat,lng:e.geometry.location.lng},onClick:function(){B(e)},icon:{url:N.a,scaledSize:new window.google.maps.Size(40,40)}})})),J?l.a.createElement(g.b,{position:{lat:J.geometry.location.lat,lng:J.geometry.location.lng},onCloseClick:function(){B(null)}},l.a.createElement("div",null,l.a.createElement("h4",null,J.name),l.a.createElement("img",{src:"https://maps.googleapis.com/maps/api/streetview?size=160x80&location=".concat(J.geometry.location.lat,",").concat(J.geometry.location.lng,"&fov=80&heading=70&pitch=0&key=").concat(F),alt:"restaurant-street-view"}),l.a.createElement("div",{style:{color:"gold"}},J.rating," ",l.a.createElement("span",null," ",l.a.createElement(C.a,{rating:J.rating,starDimension:"18px",starSpacing:"1px",starRatedColor:"gold",numberOfStars:5}))),l.a.createElement("div",null,l.a.createElement("div",null,ie===J.name?'"'.concat(ae,'"'):null),J.rating>=4?se[0]:J.rating>=3.5?se[1]:J.rating>=3?se[2]:se[3]))):null,l.a.createElement(T,{firstRating:G,setFirstRating:H,secondRating:Z,setSecondRating:$}),l.a.createElement(k,{nearbyRestaurants:Q,setQuery:ne,setInfoWindowName:oe}))):"Loading..."}i.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(M,null)),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.6108bd4a.chunk.js.map