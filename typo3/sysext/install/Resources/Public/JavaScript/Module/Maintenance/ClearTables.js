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
var __awaiter=this&&this.__awaiter||function(t,e,s,a){return new(s||(s=Promise))((function(r,n){function o(t){try{c(a.next(t))}catch(t){n(t)}}function i(t){try{c(a.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(o,i)}c((a=a.apply(t,e||[])).next())}))};define(["require","exports","jquery","../AbstractInteractableModule","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Notification","TYPO3/CMS/Core/Ajax/AjaxRequest","../../Router"],(function(t,e,s,a,r,n,o,i){"use strict";class c extends a.AbstractInteractableModule{constructor(){super(...arguments),this.selectorClearTrigger=".t3js-clearTables-clear",this.selectorStatsTrigger=".t3js-clearTables-stats",this.selectorOutputContainer=".t3js-clearTables-output",this.selectorStatContainer=".t3js-clearTables-stat-container",this.selectorStatTemplate=".t3js-clearTables-stat-template",this.selectorStatDescription=".t3js-clearTables-stat-description",this.selectorStatRows=".t3js-clearTables-stat-rows",this.selectorStatName=".t3js-clearTables-stat-name"}initialize(t){this.currentModal=t,this.getStats(),t.on("click",this.selectorStatsTrigger,t=>{t.preventDefault(),s(this.selectorOutputContainer).empty(),this.getStats()}),t.on("click",this.selectorClearTrigger,t=>{const e=s(t.target).closest(this.selectorClearTrigger).data("table");t.preventDefault(),this.clear(e)})}getStats(){const t=this.getModalBody();new o(i.getUrl("clearTablesStats")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){const s=yield e.resolve();!0===s.success?(t.empty().append(s.html),r.setButtons(s.buttons),Array.isArray(s.stats)&&s.stats.length>0&&s.stats.forEach(e=>{if(e.rowCount>0){const s=t.find(this.selectorStatTemplate).clone();s.find(this.selectorStatDescription).text(e.description),s.find(this.selectorStatName).text(e.name),s.find(this.selectorStatRows).text(e.rowCount),s.find(this.selectorClearTrigger).attr("data-table",e.name),t.find(this.selectorStatContainer).append(s.html())}})):n.error("Something went wrong")})),e=>{i.handleAjaxError(e,t)})}clear(t){const e=this.getModalBody(),s=this.getModuleContent().data("clear-tables-clear-token");new o(i.getUrl()).post({install:{action:"clearTablesClear",token:s,table:t}}).then(t=>__awaiter(this,void 0,void 0,(function*(){const e=yield t.resolve();!0===e.success&&Array.isArray(e.status)?e.status.forEach(t=>{n.success(t.message)}):n.error("Something went wrong"),this.getStats()})),t=>{i.handleAjaxError(t,e)})}}return new c}));