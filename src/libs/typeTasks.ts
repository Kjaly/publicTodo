// TODO напиши типизацию для функции getProperty
const testData = { '1': 1, 12: 'foo', c: [1, 2, 3], d: { e: 1, g: 2 } };
const testData2 = { 1: 'a', 2: 'b', 3: 'c' };

// const getProperty = (obj, key) => {
//   return obj[key];
// };

// getProperty(testData2, 1);
// getProperty(testData, 1);

// TODO Удаление свойств по условию (FilterByValue)
// Задача: Удалить из объекта все свойства с определённым типом значения.

export const filterByValueTask = () => {
  // type TestObject = {
  //   id: number;
  //   name: string;
  //   isAdmin: boolean;
  //   createdAt: Date;
  // };
  // type FilterByValue
  // type StringFiltered = FilterByValue<TestObject, string>;
  /*
		Результат:
		{
			id: number;
			isAdmin: boolean;
			createdAt: Date;
		}
	*/
};

// TODO Тип для REST API ответа
// Задача: Создать универсальный тип ответа API.

export const apiResponseTask = () => {
  // type ApiResponse
  // type User = {
  //   id: number;
  //   name: string;
  // };
  // type SuccessResponse = ApiResponse<User[]>;
  /*
		{
			status: 'success';
			data: User[];
		}
	*/
  // type ErrorResponse = ApiResponse<null>;
  /*
		{
			status: 'error';
			errorMessage: string;
		}
	*/
};

// TODO Тип для REST API ответа
// Задача: Добавить новое опциональное поле в объект, но только если оно ещё не существует.

export const addOptionalFieldTask = () => {
  // type AddOptionalField
  // type Original = {
  //   id: number;
  //   name: string;
  // };
  // type WithNewField = AddOptionalField<Original, 'age', number>;
  /*
		Результат:
		{
			id: number;
			name: string;
			age?: number;
		}
	*/
  // type NoChange = AddOptionalField<Original, 'id', string>;
  /*
		Результат:
		{
			id: number;
			name: string;
		}
	*/
};
