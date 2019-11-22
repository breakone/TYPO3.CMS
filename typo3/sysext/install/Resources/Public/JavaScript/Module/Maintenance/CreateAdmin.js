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
var __awaiter=this&&this.__awaiter||function(t,e,n,a){return new(n||(n=Promise))((function(s,i){function r(t){try{c(a.next(t))}catch(t){i(t)}}function o(t){try{c(a.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,o)}c((a=a.apply(t,e||[])).next())}))};define(["require","exports","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Notification","TYPO3/CMS/Core/Ajax/AjaxRequest","../../Router","../PasswordStrength","../AbstractInteractableModule"],(function(t,e,n,a,s,i,r,o){"use strict";class c extends o.AbstractInteractableModule{constructor(){super(...arguments),this.selectorAdminCreateButton=".t3js-createAdmin-create"}initialize(t){this.currentModal=t,this.getData(),t.on("click",this.selectorAdminCreateButton,t=>{t.preventDefault(),this.create()}),t.on("click",".t3-install-form-password-strength",()=>{r.initialize(".t3-install-form-password-strength")})}getData(){const t=this.getModalBody();new s(i.getUrl("createAdminGetData")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){const s=yield e.resolve();!0===s.success?(t.empty().append(s.html),n.setButtons(s.buttons)):a.error("Something went wrong")})),e=>{i.handleAjaxError(e,t)})}create(){const t=this.getModalBody(),e=this.getModuleContent().data("create-admin-token");new s(i.getUrl()).post({install:{action:"createAdmin",token:e,userName:this.findInModal(".t3js-createAdmin-user").val(),userPassword:this.findInModal(".t3js-createAdmin-password").val(),userPasswordCheck:this.findInModal(".t3js-createAdmin-password-check").val(),userEmail:this.findInModal(".t3js-createAdmin-email").val(),userSystemMaintainer:this.findInModal(".t3js-createAdmin-system-maintainer").is(":checked")?1:0}}).then(t=>__awaiter(this,void 0,void 0,(function*(){const e=yield t.resolve();!0===e.success&&Array.isArray(e.status)?e.status.forEach(t=>{2===t.severity?a.error(t.message):a.success(t.title)}):a.error("Something went wrong")})),e=>{i.handleAjaxError(e,t)}),this.findInModal(".t3js-createAdmin-user").val(""),this.findInModal(".t3js-createAdmin-password").val(""),this.findInModal(".t3js-createAdmin-password-check").val(""),this.findInModal(".t3js-createAdmin-email").val(""),this.findInModal(".t3js-createAdmin-system-maintainer").prop("checked",!1)}}return new c}));