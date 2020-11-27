import { useEffect, useState } from "react";
import queryString from "query-string";

import "./HomePage.scss";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import PostFilterForm from "./components/PostFilterForm";
import Clock from "./components/Clock";
import BetterClock from "./components/BetterClock";
import MagicBox from "./components/MagicBox";

function HomePage() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Nguyen Nhat Thien" },
    { id: 2, title: "Phan Thanh Dat" },
    { id: 3, title: "Lieu Trieu Thuan" },
  ]);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRow: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        //queryString.stringify(filters) => _limit=10&_page=1
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;
        setPosts(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Fetch post list faild: ", error.message);
      }
    }
    fetchPostList();
  }, [filters]);

  function handleTodoClick(todo) {
    const todoIndex = todoList.findIndex((item) => todo.id === item.id);
    if (todoIndex < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(todoIndex, 1);
    setTodoList(newTodoList);
  }

  function handleTodoSubmit(formValues) {
    const newTodoList = [...todoList];
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleFilterChange(newFilter) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilter.searchTerm,
    });
  }
  const [closeClock, setCloseClock] = useState(true);
  return (
    <div className="app">
      <h1>React Hook - Post List</h1>
      {/* <PostFilterForm onSubmit={handleFilterChange} />
      <PostList posts={posts} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
      {/* <TodoForm onSubmit={handleTodoSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      {/* <Clock />
      <BetterClock /> */}
      <MagicBox />
    </div>
  );
}

export default HomePage;
