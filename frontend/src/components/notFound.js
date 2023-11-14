const NotFound = () => {
    return (
      <div id="chat" className="h-100">
        <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                Chat Slack
              </a>
            </div>
          </nav>
          <div className="text-center">
            <h1 className="h4 text-muted">Страница не найдена</h1>
            <p className="text-muted">
              Но вы можете перейти <a>на главную страницу</a>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default NotFound;