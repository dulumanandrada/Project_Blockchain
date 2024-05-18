
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;
// pragma solidity 0.4.17;

interface IPatient {
    function getPatientDetails(address patientAddr, address doctorAddr) external view returns (string memory, string memory);
}

contract doctor {
    struct Doctors{
        string ic;
        string name;
        string qualification;
    }

    address public owner;
    address[] public doctorList;
    mapping(address => Doctors) doctors;
    mapping(address => bool) isDoctor;
    uint256 public doctorCount = 0;

    function Doctor() public {
        owner = msg.sender;
    }

    //Retrieve patient details from doctor registration page and store the details into the blockchain
    function setDoctor(string memory _ic, string memory _name, string memory _qualification) public {
        require(!isDoctor[msg.sender]);
        Doctors storage d = doctors[msg.sender];
        d.ic = _ic;
        d.name = _name;
        d.qualification = _qualification;
        doctorList.push(msg.sender);
        isDoctor[msg.sender] = true;
        doctorCount++;
    }

    //Allows doctors to edit their existing profile
    function editDoctor(string memory _ic, string memory _name, string memory _qualification) public {
        require(isDoctor[msg.sender]);
        Doctors storage d = doctors[msg.sender];
        d.ic = _ic;
        d.name = _name;
        d.qualification = _qualification;
    }

    // Funcție publică pentru a obține detaliile unui doctor
    function getDoctorDetails(address _address) public view returns (string memory ic, string memory name, string memory qualification) {
        Doctors storage d = doctors[_address];
        return (d.ic, d.name, d.qualification);
    }

    //Retrieve a list of all doctors address
    function getDoctors() public view returns(address[] memory) {
        return doctorList;
    }

    //Retrieve doctor count
    function getDoctorCount() public view returns(uint256) {
        return doctorCount;
    }

    // View patient details if permission is granted
    function viewPatientDetails(address patientContractAddress, address patientAddr) public view returns (string memory, string memory) {
        IPatient patientContract = IPatient(patientContractAddress);
        (string memory ic, string memory name) = patientContract.getPatientDetails(patientAddr, msg.sender);
        return (ic, name);
    }
}


