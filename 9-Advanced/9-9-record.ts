{
  //Map과 비슷하게 A와 B를 엮고 싶을때, key는 A타입으로 value는 B타입으로 지정하고 싶을 때 사용

  type PageInfo = {
    title: string;
  };
  type Page = 'home' | 'about' | 'contact';

  const nav: Record<Page, PageInfo> = {
    home: { title: 'Home' },
    about: { title: 'About' },
    contact: { title: 'Contact' },
  };
}
