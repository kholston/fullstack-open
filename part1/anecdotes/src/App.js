import React, {useState} from 'react'

const Header = ({text}) => (<h1>{text}</h1>)
const VoteCount = ({count}) => (<div>has {count} votes</div>)
const Anecdote = ({text, count}) => {
 return (<div>
   <div>{text}</div>
    <VoteCount count={count}/>
  </div>)
}
const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)


const App = () =>{
  
  
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
 
  
  const randomNum = (max) => Math.floor(Math.random() * max);
  
  const handleNextClick = () => (setSelected(randomNum(anecdotes.length - 1)))
  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }
  
  const mostVotes = () => {
    let maxIndex = 0;
    let maxVotes = 0;
    for(let i = 0; i < votes.length; i ++){
      if(votes[i] > maxVotes){
        maxVotes = votes[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  }
  
  
   
  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Anecdote text={anecdotes[selected]} count={votes[selected]}/>
      <Button handleClick={handleVoteClick} text='vote'/>
      <Button handleClick={handleNextClick} text='next anecdote'/>
      
      <Header text='Anecdote with most votes'/>
      <Anecdote text={anecdotes[mostVotes()]} count={votes[mostVotes()]}/>
    </div>
  )
}

export default App;
