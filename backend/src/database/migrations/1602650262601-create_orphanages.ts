import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602650262601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true, //faz o id sempre ser posisitvo (nunca negativo)
          isPrimary: true,
          isGenerated: true, //faz o id ser gerado automaticamente
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10, //números antes da vírgula
          precision: 2, //números depois da virgula
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text'
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false
        },
      ],
    }))
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }
}
