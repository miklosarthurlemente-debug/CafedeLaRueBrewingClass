export const manualFilename='Cafe_de_La_Rue_Basic_Barista_Training_Manual_36_pages.pdf';
let embeddedManualUrl:string|undefined;
export const manualUrl=()=>{
 const embedded=window.__CAFE_OFFLINE_ASSETS__?.[`manuals/${manualFilename}`];
 if(!embedded)return `${import.meta.env.BASE_URL}manuals/${manualFilename}`;
 if(!embeddedManualUrl){const bytes=Uint8Array.from(atob(embedded.slice(embedded.indexOf(',')+1)),c=>c.charCodeAt(0));embeddedManualUrl=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}))}
 return embeddedManualUrl;
};
