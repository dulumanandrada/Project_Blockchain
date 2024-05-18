// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;
// pragma solidity 0.4.17;


contract patient {
    struct Patients{
        string ic;
        string name;
    }

    address public owner;
    address[] public patientList;
    // address[] public doctorList;

    mapping(address => Patients) patients;
    // mapping(address => Doctors) doctors;

    mapping(address=>mapping(address=>bool)) isApproved;
    mapping(address => bool) isPatient;
    // mapping(address => bool) isDoctor;

    uint256 public patientCount = 0;
    // uint256 public doctorCount = 0;
    uint256 public permissionGrantedCount = 0;
    
    function Patient() public {
        owner = msg.sender;
    }
    
    //Retrieve patient details from user sign up page and store the details into the blockchain
    function setDetails(string memory _ic, string memory _name) public {
        require(!isPatient[msg.sender]);
        Patients storage p = patients[msg.sender];
        
        p.ic = _ic;
        p.name = _name;
        
        patientList.push(msg.sender);
        isPatient[msg.sender] = true;
        isApproved[msg.sender][msg.sender] = true;
        patientCount++;
    }

    //Allows patient to edit their existing record
    function editDetails(string memory _ic, string memory _name) public {
        require(isPatient[msg.sender]);
        Patients storage p = patients[msg.sender];
        p.ic = _ic;
        p.name = _name;
    }

    //Owner of the record must give permission to doctor only they are allowed to view records
    function givePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = true;
        permissionGrantedCount++;
        return true;
    }

    //Owner of the record can take away the permission granted to doctors to view records
    function RevokePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = false;
        return true;
    }

    //Retrieve a list of all patients address
    function getPatients() public view returns(address[] memory) {
        return patientList;
    }

    //Retrieve patient count
    function getPatientCount() public view returns(uint256) {
        return patientCount;
    }

    //Retrieve permission granted count
    function getPermissionGrantedCount() public view returns(uint256) {
        return permissionGrantedCount;
    }
}


