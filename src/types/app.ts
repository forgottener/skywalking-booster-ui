/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface Option {
  value: string;
  label: string;
}
export interface Duration {
  start: Date;
  end: Date;
  step: string;
}
export interface DurationTime {
  start: string;
  end: string;
  step: string;
}
export type Paging = {
  pageNum: number;
  pageSize: number;
};

export type EventParams = {
  componentType: string;
  seriesType: string;
  seriesIndex: number;
  seriesName: string;
  name: string;
  data: unknown;
  dataType: string;
  value: number | any[];
  color: string;
  event: Recordable;
  dataIndex: number;
};

export interface MenuOptions extends SubItem {
  hasGroup?: boolean;
  subItems: SubItem[];
}

export interface SubItem {
  layer: string;
  icon: string;
  title: string;
  activate: boolean;
  name: string;
  path?: string;
  notShow?: boolean;
  id?: string;
  description: string;
  documentLink: string;
  descKey: string;
  i18nKey: string;
}

export interface MetricsTTL {
  minute: number;
  hour: number;
  day: number;
  coldMinute: number;
  coldHour: number;
  coldDay: number;
}

export interface RecordsTTL {
  normal: number;
  trace: number;
  zipkinTrace: number;
  log: number;
  browserErrorLog: number;
  coldNormal: number;
  coldTrace: number;
  coldZipkinTrace: number;
  coldLog: number;
  coldBrowserErrorLog: number;
}
