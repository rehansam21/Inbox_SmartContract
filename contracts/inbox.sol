pragma solidity ^0.4.17; 

contract Inbox{
    string public message;
  
    // constructor (string initialMessage) public {
    //     message = initialMessage;
        
    // }

    message = string initialMessage;
    
    function setMessage(string newMessage) public {
        message = newMessage;
        
    }
    
    function getMessage() public view returns (string){
        return message;
    }
}

//   "mocha": "^9.0.3",

 // function starts with contract name so it is a Constructor  function. which will be execute only once at the time of deploying SC