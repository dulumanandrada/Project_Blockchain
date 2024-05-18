
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;
// pragma solidity 0.4.17;


contract doctor {
    struct Doctors{
        string ic;
        string name;
        string phone;
        string qualification;
        address addr;
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
        d.addr = msg.sender;
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
        d.addr = msg.sender;
    }


    //Retrieve a list of all doctors address
    function getDoctors() public view returns(address[] memory) {
        return doctorList;
    }

    //Retrieve doctor count
    function getDoctorCount() public view returns(uint256) {
        return doctorCount;
    }
}


