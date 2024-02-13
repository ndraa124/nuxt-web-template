import { useRuntimeConfig } from "nuxt/app";

export const useDownloadFile = (fileName: string) => {
  const link = document.createElement("a");
  link.href = useRuntimeConfig().public.baseFile + "/files/" + fileName;
  link.download = fileName;
  link.target = "_blank";
  link.click();

  return ref(true);
};

export const useDownloadBarcode = (fileName: string, isPreview: boolean) => {
  const link = document.createElement("a");
  link.href = useRuntimeConfig().public.baseFile + "/barcode/" + fileName;
  link.download = fileName;
  link.target = "_blank";
  link.click();

  return ref(true);
};

export const usePreviewPdf = (encoding: string) => {
  var base64 = `${encoding}`;
  const blob = base64ToBlob(base64, "application/pdf");
  const url = URL.createObjectURL(blob);
  const pdfWindow = window.open("");
  pdfWindow?.document.write(
    "<iframe width='100%' height='100%' src='" + url + "'></iframe>"
  );

  return ref(true);
};

const base64ToBlob = (base64: string, type = "application/octet-stream") => {
  const binStr = atob(base64);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  return new Blob([arr], { type: type });
};
