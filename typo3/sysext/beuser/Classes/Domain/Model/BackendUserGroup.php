<?php
namespace TYPO3\CMS\Beuser\Domain\Model;

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2012 Felix Kopp <felix-source@phorax.com>
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *  A copy is found in the textfile GPL.txt and important notices to the license
 *  from the author is found in LICENSE.txt distributed with these scripts.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/
/**
 * Model for backend user group
 *
 * @author Felix Kopp <felix-source@phorax.com>
 * @package TYPO3
 * @subpackage beuser
 */
class BackendUserGroup extends \TYPO3\CMS\Extbase\DomainObject\AbstractEntity {

	/**
	 * @var string
	 */
	protected $title;

	/**
	 * @var \TYPO3\CMS\Extbase\Persistence\Generic\ObjectStorage<\TYPO3\CMS\Beuser\Domain\Model\BackendUserGroup>
	 * @lazy
	 */
	protected $subGroups;

	/**
	 * @param string $title
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * @return string
	 */
	public function getTitle() {
		return $this->title;
	}

	/**
	 * @param \TYPO3\CMS\Extbase\Persistence\Generic\ObjectStorage $subGroups
	 */
	public function setSubGroups($subGroups) {
		$this->subGroups = $subGroups;
	}

	/**
	 * @return \TYPO3\CMS\Extbase\Persistence\Generic\ObjectStorage
	 */
	public function getSubGroups() {
		return $this->subGroups;
	}

}


?>