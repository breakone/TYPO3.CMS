/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __awaiter=this&&this.__awaiter||function(e,n,t,s){return new(t||(t=Promise))((function(i,a){function o(e){try{l(s.next(e))}catch(e){a(e)}}function r(e){try{l(s.throw(e))}catch(e){a(e)}}function l(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,r)}l((s=s.apply(e,n||[])).next())}))};define(["require","exports","jquery","../AbstractInteractableModule","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Notification","../../Ajax/AjaxQueue","../../Router","bootstrap"],(function(e,n,t,s,i,a,o,r){"use strict";class l extends s.AbstractInteractableModule{constructor(){super(...arguments),this.listOfAffectedRestFileHashes=[],this.selectorExtensionContainer=".t3js-extensionScanner-extension",this.selectorNumberOfFiles=".t3js-extensionScanner-number-of-files",this.selectorScanSingleTrigger=".t3js-extensionScanner-scan-single",this.selectorExtensionScanButton=".t3js-extensionScanner-scan-all"}initialize(e){this.currentModal=e,this.getData(),e.on("show.bs.collapse",this.selectorExtensionContainer,e=>{const n=t(e.currentTarget);if(void 0===n.data("scanned")){const e=n.data("extension");this.scanSingleExtension(e),n.data("scanned",!0)}}).on("click",this.selectorScanSingleTrigger,e=>{e.preventDefault();const n=t(e.currentTarget).closest(this.selectorExtensionContainer).data("extension");this.scanSingleExtension(n)}).on("click",this.selectorExtensionScanButton,n=>{n.preventDefault(),t(n.currentTarget).addClass("disabled").prop("disabled",!0);const s=e.find(this.selectorExtensionContainer);this.scanAll(s)})}getData(){const e=this.getModalBody();o.add({url:r.getUrl("extensionScannerGetData"),onfulfilled:n=>__awaiter(this,void 0,void 0,(function*(){const t=yield n.resolve();!0===t.success?(e.empty().append(t.html),i.setButtons(t.buttons)):a.error("Something went wrong")})),onrejected:n=>{r.handleAjaxError(n,e)}})}getExtensionSelector(e){return this.selectorExtensionContainer+"-"+e}scanAll(e){this.findInModal(this.selectorExtensionContainer).removeClass("panel-danger panel-warning panel-success").find(".panel-progress-bar").css("width",0).attr("aria-valuenow",0).find("span").text("0%"),this.setProgressForAll(),e.each((e,n)=>{const s=t(n),i=s.data("extension");this.scanSingleExtension(i),s.data("scanned",!0)})}setStatusMessageForScan(e,n,t){this.findInModal(this.getExtensionSelector(e)).find(this.selectorNumberOfFiles).text("Checked "+n+" of "+t+" files")}setProgressForScan(e,n,t){const s=n/t*100;this.findInModal(this.getExtensionSelector(e)).find(".panel-progress-bar").css("width",s+"%").attr("aria-valuenow",s).find("span").text(s+"%")}setProgressForAll(){const e=this.findInModal(this.selectorExtensionContainer).length,n=this.findInModal(this.selectorExtensionContainer+".t3js-extensionscan-finished.panel-success").length+this.findInModal(this.selectorExtensionContainer+".t3js-extensionscan-finished.panel-warning").length+this.findInModal(this.selectorExtensionContainer+".t3js-extensionscan-finished.panel-danger").length,t=n/e*100,s=this.getModalBody();this.findInModal(".t3js-extensionScanner-progress-all-extension .progress-bar").css("width",t+"%").attr("aria-valuenow",t).find("span").text(n+" of "+e+" scanned"),n===e&&(this.findInModal(this.selectorExtensionScanButton).removeClass("disabled").prop("disabled",!1),a.success("Scan finished","All extensions have been scanned"),o.add({url:r.getUrl(),method:"POST",data:{install:{action:"extensionScannerMarkFullyScannedRestFiles",token:this.getModuleContent().data("extension-scanner-mark-fully-scanned-rest-files-token"),hashes:this.uniqueArray(this.listOfAffectedRestFileHashes)}},onfulfilled:e=>__awaiter(this,void 0,void 0,(function*(){const n=yield e.resolve();!0===n.success&&a.success("Marked not affected files","Marked "+n.markedAsNotAffected+" ReST files as not affected.")})),onrejected:e=>{r.handleAjaxError(e,s)}}))}uniqueArray(e){return e.filter((e,n,t)=>t.indexOf(e)===n)}scanSingleExtension(e){const n=this.getModuleContent().data("extension-scanner-files-token"),s=this.getModalBody(),i=this.findInModal(this.getExtensionSelector(e));let l=!1;i.removeClass("panel-danger panel-warning panel-success t3js-extensionscan-finished"),i.data("hasRun","true"),i.find(".t3js-extensionScanner-scan-single").text("Scanning...").attr("disabled","disabled"),i.find(".t3js-extensionScanner-extension-body-loc").empty().text("0"),i.find(".t3js-extensionScanner-extension-body-ignored-files").empty().text("0"),i.find(".t3js-extensionScanner-extension-body-ignored-lines").empty().text("0"),this.setProgressForAll(),o.add({url:r.getUrl(),method:"POST",data:{install:{action:"extensionScannerFiles",token:n,extension:e}},onfulfilled:n=>__awaiter(this,void 0,void 0,(function*(){const d=yield n.resolve();if(!0===d.success&&Array.isArray(d.files)){const n=d.files.length;if(n>0){this.setStatusMessageForScan(e,0,n),i.find(".t3js-extensionScanner-extension-body").text("");let c=0;d.files.forEach(d=>{o.add({method:"POST",data:{install:{action:"extensionScannerScanFile",token:this.getModuleContent().data("extension-scanner-scan-file-token"),extension:e,file:d}},url:r.getUrl(),onfulfilled:a=>__awaiter(this,void 0,void 0,(function*(){const o=yield a.resolve();if(c++,this.setStatusMessageForScan(e,c,n),this.setProgressForScan(e,c,n),o.success&&t.isArray(o.matches)&&o.matches.forEach(e=>{l=!0;const n=s.find("#t3js-extensionScanner-file-hit-template").clone();n.find(".t3js-extensionScanner-hit-file-panel-head").attr("href","#collapse"+e.uniqueId),n.find(".t3js-extensionScanner-hit-file-panel-body").attr("id","collapse"+e.uniqueId),n.find(".t3js-extensionScanner-hit-filename").text(d),n.find(".t3js-extensionScanner-hit-message").text(e.message),"strong"===e.indicator?n.find(".t3js-extensionScanner-hit-file-panel-head .badges").append('<span class="badge" title="Reliable match, false positive unlikely">strong</span>'):n.find(".t3js-extensionScanner-hit-file-panel-head .badges").append('<span class="badge" title="Probable match, but can be a false positive">weak</span>'),!0===e.silenced&&n.find(".t3js-extensionScanner-hit-file-panel-head .badges").append('<span class="badge" title="Match has been annotated by extension author as false positive match">silenced</span>'),n.find(".t3js-extensionScanner-hit-file-lineContent").empty().text(e.lineContent),n.find(".t3js-extensionScanner-hit-file-line").empty().text(e.line+": "),t.isArray(e.restFiles)&&e.restFiles.forEach(e=>{const t=s.find("#t3js-extensionScanner-file-hit-rest-template").clone();t.find(".t3js-extensionScanner-hit-rest-panel-head").attr("href","#collapse"+e.uniqueId),t.find(".t3js-extensionScanner-hit-rest-panel-head .badge").empty().text(e.version),t.find(".t3js-extensionScanner-hit-rest-panel-body").attr("id","collapse"+e.uniqueId),t.find(".t3js-extensionScanner-hit-rest-headline").text(e.headline),t.find(".t3js-extensionScanner-hit-rest-body").text(e.content),t.addClass("panel-"+e.class),n.find(".t3js-extensionScanner-hit-file-rest-container").append(t),this.listOfAffectedRestFileHashes.push(e.file_hash)});const a=n.find(".panel-breaking",".t3js-extensionScanner-hit-file-rest-container").length>0?"panel-danger":"panel-warning";n.addClass(a),i.find(".t3js-extensionScanner-extension-body").removeClass("hide").append(n),"panel-danger"===a&&i.removeClass("panel-warning").addClass(a),"panel-warning"!==a||i.hasClass("panel-danger")||i.addClass(a)}),o.success){const e=parseInt(i.find(".t3js-extensionScanner-extension-body-loc").text(),10);if(i.find(".t3js-extensionScanner-extension-body-loc").empty().text(e+o.effectiveCodeLines),o.isFileIgnored){const e=parseInt(i.find(".t3js-extensionScanner-extension-body-ignored-files").text(),10);i.find(".t3js-extensionScanner-extension-body-ignored-files").empty().text(e+1)}const n=parseInt(i.find(".t3js-extensionScanner-extension-body-ignored-lines").text(),10);i.find(".t3js-extensionScanner-extension-body-ignored-lines").empty().text(n+o.ignoredLines)}c===n&&(l||i.addClass("panel-success"),i.addClass("t3js-extensionscan-finished"),this.setProgressForAll(),i.find(".t3js-extensionScanner-scan-single").text("Rescan").attr("disabled",null))})),onrejected:t=>{c+=1,this.setStatusMessageForScan(e,c,n),this.setProgressForScan(e,c,n),this.setProgressForAll(),a.error("Oops, an error occurred","Please look at the console output for details"),console.error(t)}})})}else a.warning("No files found","The extension EXT:"+e+" contains no files we can scan")}else a.error("Oops, an error occurred","Please look at the console output for details"),console.error(d)})),onrejected:e=>{r.handleAjaxError(e,s)}})}}return new l}));