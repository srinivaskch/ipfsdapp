pragma solidity ^0.5.0;
import "./StringUtils.sol";

contract CastYourVote {

    string[] candidateList;
    uint8 test;

    event log(string comment, string variable);

    mapping(string => uint8) Votesreceived; // "A" => 3 Votes Votesreceived[A]=3...

    constructor(string memory candidateName) public{
        candidateList.push(candidateName);
       emit log('candidate List', candidateList[0]);
    }


    function addCandidates(string memory candidateName) public {
        candidateList.push(candidateName);
    }

    function voteFor(string memory candidateName) public
    {
        for (uint8 i=0; i<candidateList.length; i++ )
        {
            if (StringUtils.equal(candidateName,candidateList[i]))
            {
                Votesreceived[candidateList[i]] = Votesreceived[candidateList[i]] +1;
            }
        }
    }


    function totalVotesReceived(string memory candidateName) public view returns (uint8 votes)
    {
        for (uint8 i=0; i<candidateList.length; i++ )
        {
            if (StringUtils.equal(candidateName,candidateList[i]))
            {
                return Votesreceived[candidateList[i]];
            }
        }
    }


}
