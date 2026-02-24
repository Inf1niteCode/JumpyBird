// Импорт необходимых модулей из Cocos Creator
import {
  _decorator,   // Декораторы Cocos (для классов и свойств)
  Canvas,       // Компонент Canvas (основной UI-контейнер сцены)
  Component,    // Базовый класс для всех компонентов
  director,     // Управление сценами
  Node,         // Узел сцены
  UITransform,  // Компонент для работы с размерами UI
  Vec3,         // Класс для 3D-вектора (позиция, масштаб и т.д.)
} from "cc";

// Деструктурируем декораторы
const { ccclass, property } = _decorator;

// Регистрируем класс как компонент Cocos
@ccclass("Ground")
export class Ground extends Component {

  // Свойство для первого куска земли (назначается в инспекторе)
  @property({
    type: Node,
    tooltip: "Ground 1 is here",
  })
  public ground1: Node = null;

  // Второй кусок земли
  @property({
    type: Node,
    tooltip: "Ground 2 is here",
  })
  public ground2: Node = null;

  // Третий кусок земли
  @property({
    type: Node,
    tooltip: "Ground 3 is here",
  })
  public ground3: Node = null;

  // Переменные для хранения ширины каждого сегмента земли
  public groundWidth1: number;
  public groundWidth2: number;
  public groundWidth3: number;

  // Временные переменные для хранения стартовых позиций
  public tempStartLocation1 = new Vec3();
  public tempStartLocation2 = new Vec3();
  public tempStartLocation3 = new Vec3();

  // Скорость движения земли (пикселей в секунду)
  public gameSpeed: number = 50;

  // Метод вызывается при загрузке компонента
  onLoad(): void {
    this.startUp(); // Инициализация позиций
  }

  // Метод инициализации
  startUp() {
    // Получаем ширину каждого сегмента земли через компонент UITransform
    this.groundWidth1 = this.ground1.getComponent(UITransform).width;
    this.groundWidth2 = this.ground2.getComponent(UITransform).width;
    this.groundWidth3 = this.ground3.getComponent(UITransform).width;

    // Устанавливаем начальные позиции по оси X:
    // первый сегмент — в нуле
    this.tempStartLocation1.x = 0;

    // второй сегмент — сразу после первого
    this.tempStartLocation2.x = this.groundWidth1;

    // третий сегмент — после первого и второго
    this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

    // Применяем позиции к объектам
    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }

  // Метод update вызывается каждый кадр
  update(deltaTime: number) {

    // Получаем текущие позиции сегментов
    this.tempStartLocation1 = this.ground1.position;
    this.tempStartLocation2 = this.ground2.position;
    this.tempStartLocation3 = this.ground3.position;

    // Двигаем землю влево:
    // скорость * время кадра (чтобы движение было независимым от FPS)
    this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

    // Получаем текущую сцену
    const scene = director.getScene();

    // Находим Canvas внутри сцены
    const canvas = scene.getComponentInChildren(Canvas);

    // Если сегмент полностью ушёл за левую границу экрана,
    // перемещаем его вправо (за пределы Canvas),
    // создавая эффект бесконечной земли

    if (this.tempStartLocation1.x <= 0 - this.groundWidth1) {
      this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
    }

    if (this.tempStartLocation2.x <= 0 - this.groundWidth2) {
      this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
    }

    if (this.tempStartLocation3.x <= 0 - this.groundWidth3) {
      this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
    }

    // Обновляем позиции объектов
    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }
}