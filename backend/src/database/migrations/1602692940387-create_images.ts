import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602692940387 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'images',
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
					name: 'path',
					type: 'varchar'
				},
				{
					name: 'orphanage_id',
					type: 'integer'
				}
			],
			foreignKeys: [
				{
					name: 'imageOrphanage',
					columnNames: ['orphanage_id'],
					referencedTableName: 'orphanages',
					referencedColumnNames: ['id'],
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				}
			]
		}));
	}
	
  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('images');
  }
}
